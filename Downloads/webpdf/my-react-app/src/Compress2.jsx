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
  const [showCompressionModal, setShowCompressionModal] = useState(false);
  const [compressionLevel, setCompressionLevel] = useState("");
  const [selectedFile, setSelectedFile] = useState(null); // State for selected file

  // useEffect for handling file from state
  useEffect(() => {
    if (location.state?.compressedFilePath) {
      const filePathFromState = location.state.compressedFilePath;
      console.log("File Path from state:", filePathFromState);
  
      const pathParts = filePathFromState.split("/");
      const extractedFileName = pathParts[pathParts.length - 1];
      setFileName(extractedFileName);
  
      // Atur URL untuk preview
      const url = `http://localhost:8000${filePathFromState}`;
      setPdfUrl(url);
  
      // Simpan file path dan file name
      setSelectedFile({ name: extractedFileName, url });
  
      setLoading(false);
    } else {
      console.error("File path not found in state.");
      setError("File path not found.");
      setLoading(false);
    }
  }, [location.state]);

  // Compress button click handler
  const handleCompressClick = async () => {
    // Make sure a file is selected
    if (!selectedFile) {
      setError("Please select a file before compressing.");
      return;
    }
  
    // Prepare the form data to send to the backend
    const formData = new FormData();
    formData.append("file", selectedFile);
  
    try {
      // Send the file to the backend to be compressed
      const response = await fetch("http://localhost:8000/api/compress", {
        method: "POST",
        body: formData,
      });
  
      // Check if the response is not OK (404, 500, etc.)
      if (!response.ok) {
        const errorText = await response.text();
        console.error("Server error response:", errorText);
        setError("Server error occurred");
        return;
      }
  
      // If the response is OK, parse the JSON response
      const data = await response.json();
      if (data) {
        const uploadedFilePath = data.compressedFilePath;
        const fileUrl = `http://localhost:8000${uploadedFilePath}`;
        setPdfUrl(fileUrl);
        setFileName(selectedFile.name);
        setSelectedFile(null); // Reset selected file after successful compression
  
        // Redirect to a new page to show success message or the compressed file
        navigate("/compress-success", { state: { fileName, fileUrl } });
      }
    } catch (error) {
      console.error("Error compressing file:", error);
      setError(error.message || "Failed to compress file.");
    }
  };
  
  const handleChangesFiles = async (event) => {
    const file = event.target.files[0];
    if (file && file.type === "application/pdf") {
      setSelectedFile(file);
      const fileUrl = URL.createObjectURL(file);
      setPdfUrl(fileUrl);
      setFileName(file.name);
  
      const formData = new FormData();
      formData.append("file", file);
  
      try {
        const response = await fetch("http://localhost:8000/api/compress", {
          method: "POST",
          body: formData,
        });
        if (!response.ok) {
          const errorText = await response.text();
          console.error("Error compressing file:", errorText);  // Log the full error message
          setError(errorText);  // Set the error for UI
        }
  
        const data = await response.json();
        if (data) {
          const uploadedFilePath = data.compressedFilePath;
          const fileUrl = `http://localhost:8000${uploadedFilePath}`;
  
          setPdfUrl(fileUrl);
          setFileName(file.name);
          setSelectedFile(file);
        } else {
          throw new Error("No file path returned in the response.");
        }
      } catch (error) {
        console.error("Error uploading file:", error);
        setError(error.message || "Failed to upload file.");
      }
    } else {
      setError("Please select a valid PDF file.");
    }
  };

  // Show pages button handler (placeholder)
  const handleShowPages = () => {
    console.log("Show pages clicked");
  };

  // Compression level modal handler
  const handleCompression = () => {
    setShowCompressionModal(true);
  };

  const handleSaveCompression = () => {
    console.log("Compression level selected:", compressionLevel);
    setShowCompressionModal(false);
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
        <label
          htmlFor="file-upload"
          className="px-4 py-2 bg-[#EBF5E0] text-gray-800 rounded-lg flex items-center justify-center hover:bg-[rgba(227,241,212,1)] shadow-lg border border-[#D9D9D9] cursor-pointer"
        >
          <img src={AddIcon} alt="Changes Files" className="w-6 h-6 mr-2" />
          Change Files
        </label>
        <input
          id="file-upload"
          type="file"
          accept="application/pdf"
          onChange={handleChangesFiles}
          className="hidden"
        />
        <button
          onClick={handleCompression} // Show modal
          className="px-4 py-2 bg-[#EBF5E0] text-gray-800 rounded-lg flex items-center justify-center hover:bg-[rgba(227,241,212,1)] shadow-lg border border-[#D9D9D9]"
        >
          <img src={SortIcon} alt="Sort Files" className="w-6 h-6 mr-2" />
          Compression
        </button>
      </div>

      {/* Compression Modal */}
      {showCompressionModal && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center px-4 sm:px-0">
          <div className="bg-white rounded-lg p-6 shadow-lg w-full max-w-md sm:max-w-lg">
            <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">Compression Level</h2>
            <div className="flex flex-col gap-4">
              {/* Standard Quality */}
              <button
                className={`flex items-center justify-between p-4 rounded-lg border-2 ${
                  compressionLevel === "standard"
                    ? "border-[#516A35] bg-[#EBF5E0]"
                    : "border-gray-300 bg-gray-100"
                } hover:border-[#516A35] hover:bg-[#F5FAF0]`}
                onClick={() => setCompressionLevel("standard")}
              >
                <div className="flex flex-col">
                  <span className="font-semibold text-gray-800">Standard Quality</span>
                  <span className="text-sm text-gray-600">
                    The perfect balance of performance and size.
                  </span>
                </div>
                <div
                  className={`w-5 h-5 rounded-full border-2 flex justify-center items-center ${
                    compressionLevel === "standard" ? "border-[#516A35]" : "border-gray-400"
                  }`}
                >
                  {compressionLevel === "standard" && (
                    <div className="w-3 h-3 bg-[#516A35] rounded-full"></div>
                  )}
                </div>
              </button>

              {/* Best Quality */}
              <button
                className={`flex items-center justify-between p-4 rounded-lg border-2 ${
                  compressionLevel === "best"
                    ? "border-[#516A35] bg-[#EBF5E0]"
                    : "border-gray-300 bg-gray-100"
                } hover:border-[#516A35] hover:bg-[#F5FAF0]`}
                onClick={() => setCompressionLevel("best")}
              >
                <div className="flex flex-col">
                  <span className="font-semibold text-gray-800">Best Quality</span>
                  <span className="text-sm text-gray-600">
                    Optimal choice for high-quality compression.
                  </span>
                </div>
                <div
                  className={`w-5 h-5 rounded-full border-2 flex justify-center items-center ${
                    compressionLevel === "best" ? "border-[#516A35]" : "border-gray-400"
                  }`}
                >
                  {compressionLevel === "best" && (
                    <div className="w-3 h-3 bg-[#516A35] rounded-full"></div>
                  )}
                </div>
              </button>
            </div>

            {/* Buttons */}
            <div className="flex justify-end mt-6 gap-4">
              <button
                onClick={() => setShowCompressionModal(false)}
                className="px-4 sm:px-6 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveCompression}
                className="px-4 sm:px-6 py-2 bg-[#516A35] text-white rounded-lg hover:bg-[#3F512A]"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

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
          disabled={loading || error || !selectedFile || !compressionLevel}
        >
          Compress PDF
        </button>
      </div>
    </div>
  );
};

export default CompressPage2;