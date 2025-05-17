const csv = require("csv-parser");
const XLSX = require("xlsx");

function parseCSV(buffer) {
  return new Promise((resolve, reject) => {
    const results = [];
    const stream = require("streamifier").createReadStream(buffer)
      .pipe(csv())
      .on("data", (data) => results.push(data))
      .on("end", () => resolve(results))
      .on("error", reject);
  });
}

function parseXLS(buffer) {
  const workbook = XLSX.read(buffer, { type: "buffer" });
  const sheet = workbook.Sheets[workbook.SheetNames[0]];
  return XLSX.utils.sheet_to_json(sheet);
}

function distribute(items, agentCount = 5) {
  const distributed = Array.from({ length: agentCount }, () => []);
  items.forEach((item, index) => {
    distributed[index % agentCount].push(item);
  });
  return distributed;
}

module.exports = { parseCSV, parseXLS, distribute };