import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const CompressPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (!file || !/application\/(pdf|x-pdf)/.test(file.type)) {
      alert("Please select a valid PDF file");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      setLoading(true);
      const response = await axios.post("http://localhost:8000/api/compress", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setLoading(false);

      const { compressedFilePath } = response.data; // Ambil filePath dari response.data
      console.log("Compressed file path:", compressedFilePath);
      navigate("/compress-page2", { state: { compressedFilePath } }); // Gunakan filePath langsung      
    } catch (error) {
      setLoading(false);
      console.error("Upload failed:", error.response || error.message || error);
      alert(error.response?.data?.message || "Failed to upload file. Please try again.");
    }
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    handleFileChange({ target: { files: [file] } });
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-start">
      <main className="max-w-4xl mx-auto text-center py-12 px-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">Compress PDF</h1>
        <p className="text-gray-600 mb-8">
          Reduce the file size of your PDFs, making them easier to share.
        </p>

        <div className="bg-[#EBF5E0] rounded-lg p-8 sm:p-12 md:p-16 lg:p-20 w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl flex flex-col items-center">
          <div
            className="button-background-container bg-[#EBF5E0] rounded-lg py-8 flex flex-col items-center"
            onDrop={handleDrop}
            onDragOver={handleDragOver}
          >
            <input
              type="file"
              id="fileInput"
              className="hidden"
              accept="application/pdf"
              onChange={handleFileChange}
            />
            <label
              htmlFor="fileInput"
              className="bg-[#516A35] text-white py-3 px-8 w-48 rounded-lg shadow-lg hover:bg-[#3F512A] focus:outline-none focus:ring-4 focus:ring-[#516A35] focus:ring-opacity-50 cursor-pointer"
            >
              Choose File
            </label>
            <p className="mt-2 text-gray-500 text-xs">or drag files here</p>
          </div>
          {loading && <p className="mt-4 text-gray-500">Uploading, please wait...</p>}
        </div>
      </main>
    </div>
  );
};

export default CompressPage;