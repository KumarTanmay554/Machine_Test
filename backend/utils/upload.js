const multer = require("multer");

const fileFilter = (req, file, cb) => {
  const allowedTypes = ["text/csv", "application/vnd.ms-excel", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"];
  if (allowedTypes.includes(file.mimetype)) cb(null, true);
  else cb(new Error("Only .csv, .xls, and .xlsx files are allowed"), false);
};

const storage = multer.memoryStorage();
module.exports = multer({ storage, fileFilter });