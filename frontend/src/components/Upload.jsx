import React, { useState } from "react";
import axios from "axios";
import Navbar from "./Navbar";

export default function FileUploadPage() {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setMessage("");
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) return setMessage("Please select a file.");

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await axios.post("http://localhost:3000/upload", formData);
      setMessage(res.data || "File uploaded successfully!");
      console.log("uploaded successfully");
    } catch (err) {
      setMessage(err.response?.data || "Upload failed.");
      // console.log(err)
    }
  };

  return (
    <div>
      <Navbar />
      <div className="max-w-md mx-auto mt-10 p-6 border rounded shadow">
        <h2 className="text-xl font-bold mb-4">Upload CSV / Excel File</h2>
        <form onSubmit={handleUpload}>
          <input
            type="file"
            accept=".csv, .xlsx, .xls"
            onChange={handleFileChange}
            className="block w-full mb-4 border border-gray-300 rounded p-2 "
          />
          <button
            type="submit"
            className="bg-white text-black px-4 py-2 rounded hover:bg-black hover:text-white border border-black cursor-pointer"
          >
            Upload
          </button>
        </form>
        {message && <p className="mt-4 text-sm text-red-700 ">{message}</p>}
      </div>
    </div>
  );
}
