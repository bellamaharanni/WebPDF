import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import * as pdfjsLib from "pdfjs-dist";
import "pdfjs-dist/web/pdf_viewer.css";
import ShowIcon from "./assets/showpages.png";
import AddIcon from "./assets/addfiles.png";
import SortIcon from "./assets/sortfiles.png";

// PDF.js worker configuration
pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.16.105/pdf.worker.min.js`;

const CompressPage2 = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [filePath, setFilePath] = useState(null);
  const [error, setError] = useState(null);
  const [fileName, setFileName] = useState("");

  // Mengambil file path yang diteruskan dari halaman sebelumnya
  useEffect(() => {
    if (location.state?.filePath) {
      const filePathFromState = location.state.filePath;
      const pathParts = filePathFromState.split("/");
      setFileName(pathParts[pathParts.length - 1]); // Ambil nama file dari path

      // Mengonversi path relatif ke URL penuh
      const fullPath = `http://localhost:8000${filePathFromState}`;
      setFilePath(fullPath);
    } else {
      setError("File path not found");
      setLoading(false);
    }
  }, [location.state]);

  // Fungsi untuk merender PDF dengan menggunakan pdf.js
  useEffect(() => {
    const renderPDF = async () => {
      if (!filePath) return;

      try {
        const canvas = document.getElementById("pdf-canvas");
        const context = canvas.getContext("2d");

        // Clear canvas sebelum merender
        context.clearRect(0, 0, canvas.width, canvas.height);

        // Memuat dan merender PDF
        const loadingTask = pdfjsLib.getDocument(filePath);
        const pdf = await loadingTask.promise;
        const page = await pdf.getPage(1); // Ambil halaman pertama PDF
        const viewport = page.getViewport({ scale: 2.0 });

        // Set ukuran canvas
        canvas.width = viewport.width;
        canvas.height = viewport.height;

        const renderContext = {
          canvasContext: context,
          viewport: viewport,
        };

        await page.render(renderContext).promise;
        setLoading(false);
      } catch (error) {
        console.error("Failed to load PDF:", error);
        setError(`Failed to load PDF: ${error.message}`);
        setLoading(false);
      }
    };

    if (filePath) {
      renderPDF();
    }
  }, [filePath]);

  const handleCompressClick = () => {
    // Logika kompresi file
    navigate("/compress-success");
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
    <div className="min-h-screen bg-white flex flex-col items-center justify-start">
      <main className="max-w-4xl mx-auto text-center py-12 px-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2">Compress PDF</h1>
      </main>

      {/* Preview File */}
      <div className="mt-8 bg-gray-100 rounded-lg shadow-md p-6 w-11/12 max-w-2xl">
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
            <div className="bg-white rounded-lg p-4">
              <canvas 
                id="pdf-canvas" 
                className="w-full h-auto border border-gray-200 rounded-lg"
              ></canvas>
            </div>
            <div className="flex items-center justify-between mt-4 bg-white p-3 rounded-lg">
              <p className="text-sm text-gray-600 truncate flex-1">
                {fileName || "Uploaded PDF"}
              </p>
              {filePath && (
                <a
                  href={filePath}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline text-sm ml-4"
                >
                  View Full PDF
                </a>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Button Actions */}
      <div className="flex flex-col sm:flex-row gap-4 mt-8 mb-24">
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