import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ShowIcon from "./assets/showpages.png";
import AddIcon from "./assets/addfiles.png";
import SortIcon from "./assets/sortfiles.png";

const CompressPage2 = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [fileName, setFileName] = useState("");
  const [pdfUrl, setPdfUrl] = useState("");

  // Menggunakan useEffect untuk mengatur file yang dikirim melalui state
  useEffect(() => {
    if (location.state?.compressedFilePath) {
      const filePathFromState = location.state.compressedFilePath;
      console.log("File Path from state:", filePathFromState); // Debugging URL

      const pathParts = filePathFromState.split("/");
      const extractedFileName = pathParts[pathParts.length - 1];
      setFileName(extractedFileName);

      // Menentukan URL lengkap untuk file PDF
      const url = `http://localhost:8000${filePathFromState}`;
      setPdfUrl(url);

      setLoading(false);
    } else {
      console.error("File path not found in state.");
      setError("File path not found.");
      setLoading(false);
    }
  }, [location.state]);

  const handleCompressClick = async () => {
    // Tambahkan logika kompresi PDF di sini
    console.log("Compressing PDF...");
    
    // Setel loading menjadi true dan error menjadi null sebelum memulai kompresi
    setLoading(true);
    setError(null);

    try {
      // Logika untuk mengirim request kompresi PDF ke server bisa dimasukkan di sini
      // Misalnya menggunakan axios atau fetch untuk mengirim file dan menerima file terkompresi

      // Setelah kompresi selesai, navigasikan ke halaman CompressSuccess
      navigate("/compress-success", { state: { fileName, pdfUrl } });
    } catch (err) {
      console.error("Compression failed:", err);
      setError("Compression failed. Please try again.");
      setLoading(false);
    }
  };

  const handleShowPages = () => {
    console.log("Show pages clicked");
  };

  const handleAddFiles = () => {
    console.log("Add files clicked");
  };

  const handleCompression = () => {
    console.log("Compression options clicked");
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-start pb-24">
      <main className="max-w-4xl mx-auto text-center py-12 px-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2">Compress PDF</h1>
      </main>

      {/* Button Actions */}
      <div className="flex flex-col sm:flex-row gap-4 mt-8 mb-4">
        <button 
          onClick={handleShowPages}
          className="px-4 py-2 bg-[#EBF5E0] text-gray-800 rounded-lg flex items-center justify-center hover:bg-[rgba(227,241,212,1)] shadow-lg border border-[#D9D9D9]"
        >
          <img src={ShowIcon} alt="Show Pages" className="w-6 h-6 mr-2" /> 
          Show Pages
        </button>
        <button 
          onClick={handleAddFiles}
          className="px-4 py-2 bg-[#EBF5E0] text-gray-800 rounded-lg flex items-center justify-center hover:bg-[rgba(227,241,212,1)] shadow-lg border border-[#D9D9D9]"
        >
          <img src={AddIcon} alt="Add Files" className="w-6 h-6 mr-2" /> 
          Add Files
        </button>
        <button 
          onClick={handleCompression}
          className="px-4 py-2 bg-[#EBF5E0] text-gray-800 rounded-lg flex items-center justify-center hover:bg-[rgba(227,241,212,1)] shadow-lg border border-[#D9D9D9]"
        >
          <img src={SortIcon} alt="Sort Files" className="w-6 h-6 mr-2" /> 
          Compression
        </button>
      </div>

      {/* Preview File */}
      <div className="mt-8 bg-gray-100 rounded-lg shadow-md p-6 w-11/12 max-w-2xl mb-16">
        <h2 className="text-lg font-semibold text-gray-700 mb-4">File to Compress:</h2>
        {loading ? (
          <div className="flex flex-col items-center justify-center py-8">
            <p className="text-gray-500 mb-4">Loading PDF...</p>
            <div className="w-8 h-8 border-4 border-gray-300 border-t-[#516A35] rounded-full animate-spin"></div>
          </div>
        ) : error ? (
          <div className="text-center py-8">
            <p className="text-red-500">{error}</p>
            <button
              onClick={() => navigate(-1)}
              className="mt-4 px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
            >
              Go Back
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            <div id="pdf-preview" className="bg-white rounded-lg p-4">
              {/* Gunakan iframe untuk menampilkan PDF */}
              {pdfUrl && (
                <iframe
                  src={pdfUrl}
                  width="100%"
                  height="600px"
                  title="PDF Preview"
                  frameBorder="0"
                ></iframe>
              )}
            </div>
            <div className="flex items-center justify-between mt-4 bg-white p-3 rounded-lg">
              <p className="text-sm text-gray-600 truncate flex-1">
                {fileName || "Uploaded PDF"}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Footer with Compress Button */}
      <div className="bg-gray-50 border-t border-gray-200 w-full flex justify-center fixed bottom-0 py-6">
        <button
          className="px-10 py-3 bg-[#516A35] text-white rounded-lg shadow-xl hover:bg-[#3F512A] disabled:bg-gray-400 disabled:cursor-not-allowed"
          onClick={handleCompressClick}
          disabled={loading || error}
        >
          Compress PDF
        </button>
      </div>
    </div>
  );
};

export default CompressPage2;