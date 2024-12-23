import { useLocation, useNavigate } from "react-router-dom";

const CompressSuccess = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { fileName, pdfUrl } = location.state || {};

  const toolNavigation = {
    "Merge Page": "/merge",
    "Split Page": "/split",
    "Digital Drawing": "/drawing",
    "Signature": "/certificate",
    "Watermarking": "/watermarking",
  };

  const handleDownload = () => {
    if (!pdfUrl) return;

    const link = document.createElement("a");
    link.href = pdfUrl;
    link.download = fileName || "compressed-file.pdf";
    link.click();
  };

  const handleBackToEditing = () => {
    // Navigasi kembali ke halaman CompressPage2 dengan membawa state
    navigate("/compress-page2", { state: { fileName, pdfUrl } });
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-start">
      {/* Heading */}
      <main className="max-w-4xl mx-auto text-center py-12 px-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2">PDFs Successfully Compressed!</h1>
        <p className="text-lg text-center text-gray-700 mb-8">{fileName}</p>
      </main>

      {/* Buttons */}
      <div className="flex space-x-8 mb-24">
        <button
          className="px-8 py-3 bg-[#516A35] text-white text-lg rounded-lg shadow-md hover:bg-[#3F512A]"
          onClick={handleDownload}
        >
          Download File
        </button>
        <button
          className="px-8 py-3 bg-[#516A35] text-white text-lg rounded-lg shadow-md hover:bg-[#3F512A]"
          onClick={handleBackToEditing}
        >
          Back to Editing
        </button>
      </div>

      {/* Tools */}
      <div className="flex flex-wrap justify-center gap-4 mb-8 bg-[#FCFBFB] p-6 rounded-lg shadow-lg">
        {Object.keys(toolNavigation).map((tool) => (
          <button
            key={tool}
            onClick={() => navigate(toolNavigation[tool])}
            className="px-6 py-2 bg-[#EBF5E0] text-[#516A35] text-sm font-medium border border-[#D9D9D9] rounded-md shadow-md hover:bg-[#DDECD0]"
          >
            {tool}
          </button>
        ))}
      </div>

      {/* Delete File */}
      <button className="px-6 py-2 bg-red-100 text-red-700 text-sm font-medium border border-red-300 rounded-md shadow-md hover:bg-red-200">
        Delete File
      </button>
    </div>
  );
};

export default CompressSuccess;