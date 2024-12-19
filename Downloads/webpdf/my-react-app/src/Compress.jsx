import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const CompressPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (!file || file.type !== "application/pdf") {
      alert("Please select a valid PDF file");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      setLoading(true); // Mulai loading
      const response = await axios.post("http://localhost:8000/api/compress", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setLoading(false); // Selesai loading

      const { file_path } = response.data;

      // Navigasi ke halaman hasil dengan file path sebagai state
      navigate("/compress-page2", { state: { filePath: file_path } });
    } catch (error) {
      setLoading(false);
      console.error("Upload failed:", error);
      alert(error.response?.data?.message || "Failed to upload file. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-start">
      <main className="max-w-4xl mx-auto text-center py-12 px-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">Compress PDF</h1>
        <p className="text-gray-600 mb-8">
          Reduce the file size of your PDFs, making them easier to share.
        </p>

        <div className="bg-[#EBF5E0] rounded-lg p-8 sm:p-12 md:p-16 lg:p-20 w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl flex flex-col items-center">
          <div className="button-background-container bg-[#EBF5E0] rounded-lg py-8 flex flex-col items-center">
            <input
              type="file"
              id="fileInput"
              className="hidden"
              accept="application/pdf" // Hanya menerima file PDF
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