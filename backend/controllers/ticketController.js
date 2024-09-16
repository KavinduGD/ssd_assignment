const asyncHandler = require("express-async-handler");
const Ticket = require("../models/ticketModel");
const axios = require("axios");
const sendEmail = require("../util/sendEmail");
const sanitizeHtml = require('sanitize-html');

const addTicket = asyncHandler(async (req, res) => {
    const id = req.person._id;
    const name = req.person.fullName;
    const email = req.person.email;

    const { station, total, seatCount, roadRouteId } = req.body;

    // Sanitize inputs
    const sanitizedStation = sanitizeHtml(station);
    const sanitizedTotal = sanitizeHtml(total);
    const sanitizedSeatCount = sanitizeHtml(seatCount);
    const sanitizedRoadRouteId = sanitizeHtml(roadRouteId);

    // Get all tickets and sort manually by the numerical part of ticketId
    const allTickets = await Ticket.find({});
    allTickets.sort((a, b) => {
        const numA = parseInt(a.ticketId.split("TK#kts")[1], 10);
        const numB = parseInt(b.ticketId.split("TK#kts")[1], 10);
        return numB - numA;
    });

    let ticketId = "";

    if (allTickets.length === 0) {
        ticketId = "TK#kts1";
    } else {
        const lastTicketId = allTickets[0].ticketId;
        console.log('Last Ticket ID:', lastTicketId);

        const match = lastTicketId.match(/^TK#kts(\d+)$/);
        if (match && match[1]) {
            const lastTicketIdNumber = parseInt(match[1], 10);
            console.log('Extracted Number from Last Ticket ID:', lastTicketIdNumber);

            ticketId = `TK#kts${lastTicketIdNumber + 1}`;
        } else {
            ticketId = "TK#kts1";  // Fallback in case of a parsing error
        }
    }

    console.log('Generated New Ticket ID:', ticketId);

    const config = {
        headers: { Authorization: "Bearer 6a586090-7405-11ef-a391-0376c13ccbd3" },
    };

    const bodyParameters = {
        colorDark: "#000",
        qrCategory: "url",
        text: `
      ticketId -: ${ticketId}
      station -: ${sanitizedStation}
      total -: ${sanitizedTotal}
      seatCount -: ${sanitizedSeatCount}
      roadRouteId -: ${sanitizedRoadRouteId}
    `,
    };

    let qrCode = "";
    try {
        const qrRes = await axios.post(
            "https://qrtiger.com/api/qr/static",
            bodyParameters,
            config
        );
        qrCode = qrRes.data.url;
    } catch (err) {
        res.status(500);
        throw new Error(err);
    }

    const ticket = new Ticket({
        ticketId,
        userId: id,
        date: Date.now(),
        station: sanitizedStation,
        total: sanitizedTotal,
        seatCount: sanitizedSeatCount,
        roadRouteId: sanitizedRoadRouteId,
        qrCode,
    });

    try {
        const createdTicket = await ticket.save();

        const message = `
      <h2>${sanitizeHtml(`Hello ${name}`)}</h2>
      <p>You have purchased a QR code from ICI</p>
      <p>Ticket is only valid for 2 days</p>
      <img src=${sanitizeHtml(qrCode)} width="300" height="300"/>
      <p>Regards, ICI</p>
    `;

        const subject = "Ticket Purchase";
        const sent_to = email;
        const sent_from = process.env.EMAIL_USER;

        try {
            await sendEmail(subject, message, sent_to, sent_from);
        } catch (err) {
            res.status(500);
            throw new Error("Email didn't send, Please try again");
        }

        res.status(201).json(createdTicket);
    } catch (error) {
        res.status(400);
        throw new Error(error);
    }
});

const getAllTickets = asyncHandler(async (req, res) => {
    try {
        const tickets = await Ticket.find({});
        res.json(tickets);
    } catch (error) {
        res.status(404);
        throw new Error(error);
    }
});

const getAllTicketsSingleUser = asyncHandler(async (req, res) => {
    const id = req.params.id;
    try {
        const tickets = await Ticket.find({ userId: id });
        res.json(tickets);
    } catch (error) {
        res.status(404);
        throw new Error(error);
    }
});

module.exports = { addTicket, getAllTickets,getAllTicketsSingleUser };