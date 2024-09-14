const Bus = require("../models/busModel");
const asyncHandler = require("express-async-handler");
const cloudinary = require("cloudinary").v2;
// const fs = require("fs");
const { fileSizeFormatter } = require("../util/fileUpload");
//create bus
const path = require("path");
const fs = require("fs").promises;  // Use promises for async file handling

//create bus
const createBus = asyncHandler(async (req, res) => {
  const personType = req.personType;

  if (personType === "user") {
    res.status(401);
    throw new Error("Not authorized, Please login as a manager");
  }

  const {
    busId,
    registrationNumber,
    chassisNumber,
    model,
    seatingCapacity,
    color,
    driver,
    conductor,
    owner,
  } = req.body;

  //validate input fields
  if (
    !busId ||
    !registrationNumber ||
    !chassisNumber ||
    !model ||
    !seatingCapacity ||
    !color ||
    !driver ||
    !conductor ||
    !owner
  ) {
    if (req.file) {
      try {
        const filePath = path.resolve(__dirname, "../uploads", path.basename(req.file.path));
        if (filePath.startsWith(path.resolve(__dirname, "../uploads"))) {
          await fs.unlink(filePath);
        } else {
          throw new Error("Invalid file path");
        }
      } catch (error) {
        console.error("Error deleting file:", error);
      }
    }
    res.status(400);
    throw new Error("Please fill all the fields");
  }

  //Manage image upload
  let fileData = {};
  let uploadedFile;

  if (req.file) {
    try {
      // upload image to cloudinary
      uploadedFile = await cloudinary.uploader.upload(req.file.path, {
        folder: "KTS/buses",
        resource_type: "image",
      });

      fileData = {
        fileName: req.file.originalname,
        filePath: uploadedFile.secure_url,
        fileType: req.file.mimetype,
        fileSize: fileSizeFormatter(req.file.size, 2),
        fileID: uploadedFile.public_id,
      };

      //delete local file safely
      const filePath = path.resolve(__dirname, "../uploads", path.basename(req.file.path));
      if (filePath.startsWith(path.resolve(__dirname, "../uploads"))) {
        await fs.unlink(filePath);
      } else {
        throw new Error("Invalid file path");
      }
    } catch (err) {
      res.status(500);
      throw new Error("Image could not be uploaded");
    }
  }

  try {
    const bus = await Bus.create({
      busId,
      registrationNumber,
      chassisNumber,
      model,
      seatingCapacity,
      color,
      driver,
      conductor,
      owner,
      photo: fileData,
    });

    if (bus) {
      res.status(201).json(bus);
    } else {
      if (fileData.filePath) {
        await cloudinary.uploader.destroy(uploadedFile.public_id);
      }
      res.status(400);
      throw new Error("Could not create bus");
    }
  } catch (err) {
    if (fileData.filePath) {
      await cloudinary.uploader.destroy(uploadedFile.public_id);
    }
    res.status(500);
    throw new Error(err);
  }
});
