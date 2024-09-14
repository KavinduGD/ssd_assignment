import { useTicketContext } from "../../hooks/useTicketContext";
import { useUserContext } from "../../hooks/useUserAuthContext";
import dayjs from "dayjs";

function Booking() {
  const { user } = useUserContext();
  const { tickets } = useTicketContext();

  return (
    <div className="px-[8px] xsm:px-[20px] xl:px-[100px] mb-[40px]">
      <p className="text-main_blue text-[37px] font-semibold font-barlows mt-[12px]">
        Recent Tickets
      </p>
      <div className="tickets flex flex-col gap-[30px] mt-[10px]">
        {tickets
          .filter((ticket) => ticket.userId === user._id)
          .map((ticket) => (
            <div
              key={ticket._id}
              className="ticket w-full rounded-[16px] flex pt-[14px] px-[32px] pb-[14px] lg:justify-between lg:gap-0 gap-[30px] relative md:flex-row flex-col"
              style={{
                border: "1px solid #BBB",
                background: "#F5F5F5",
                boxShadow: "0px 3.199px 3.199px 0px rgba(0, 0, 0, 0.25)",
              }}
            >
              {/* details of the ticket */}
              <div className="flex flex-col">
                {/* ticket ID */}
                <p
                  className="font-barlows text-[25px] sm:text-[37px] font-medium mb-[3px]"
                  style={{ lineHeight: "normal" }}
                >
                  Ticket ID - {ticket.ticketId}
                </p>
                {/* ticket user details */}
                <div className="flex lg:flex-row flex-col  lg:gap-[30px] xl:gap-[100px] ">
                  <div className="left-details">
                    <p className="font-barlows lg:text-[23px]  text-[18px] font-medium border-b-[3px] border-[#000] max-w-fit">
                      User Details
                    </p>
                    <div className="flex lg:gap-[30px] gap-[5px] items ">
                      <div className="flex flex-col gap-[1px] lg:text-[20px]  text-[16px] font-semibold">
                        <p>Ticket Owner</p>
                        <p>Ticket Owner Email</p>
                        <p>Date</p>
                      </div>
                      <div className="lg:text-[20px]  text-[16px]  font-bold flex flex-col gap-[3px]">
                        <p style={{ lineHeight: "normal" }}>-</p>
                        <p>-</p>
                        <p>-</p>
                      </div>
                      <div className="lg:text-[18px]  text-[15px]  flex flex-col gap-[6px] sm:ml-0 xsm:ml-[40px] ml-0">
                        <p>{user.shortName}</p>
                        <p>{user.email}</p>
                        <p>{dayjs(ticket.date).format("DD-MM-YYYY")}</p>
                      </div>
                    </div>
                  </div>
                  {/* ticket journey details */}
                  <div className="right-details">
                    <p className="font-barlows lg:text-[23px]  text-[18px]  font-medium border-b-[3px] border-[#000] max-w-fit">
                      Journey Details
                    </p>
                    <div className="flex lg:gap-[30px] gap-[5px]  items ">
                      <div className="flex flex-col gap-[1px] lg:text-[20px]  text-[16px] font-semibold">
                        <p>Station</p>
                        <p>Distance</p>
                        <p>Assigned Bus</p>
                      </div>
                      <div className="lg:text-[20px]  text-[16px] font-bold flex flex-col gap-[3px]">
                        <p style={{ lineHeight: "normal" }}>-</p>
                        <p>-</p>
                        <p>-</p>
                      </div>
                      <div className="lg:text-[18px]  text-[15px] flex flex-col gap-[6px] sm:ml-0 xsm:ml-[40px] ml-0">
                        <p>{ticket.station}</p>
                        <p>{ticket.seatCount}</p>
                        <p>GBP.{ticket.total}.00</p>
                      </div>
                    </div>
                  </div>
                </div>
                {/* ticket journey details */}
                <div className="flex-1 text-white mt-[10px] ">
                  <button className="w-full bg-main_blue h-full rounded-[8px] py-[13px] text-[18px] font-roboto font-semibold ">
                    Download QR Code
                  </button>
                </div>
              </div>
              {/* qr of the ticket */}
              <div className="flex  items-end justify-end">
                <img
                  src={ticket.qrCode}
                  alt=""
                  className="md:w-[100%] lg:w-[220px] xl:w-[230px] w-full"
                />
              </div>
              {/* valid */}
              {/* <div className="absolute top-[0px] left-[70%] sm:left-[360px] text-white h-[45px] sm:w-[100px] w-[80px] bg-main_red pt-[10px] flex justify-center rounded-b-[10px]  text-[18px] font-roboto font-medium">
                Valid
              </div> */}
            </div>
          ))}
      </div>
    </div>
  );
}

export default Booking;
