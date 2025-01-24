import { useNavigate } from "react-router-dom";
const MergeSuccess = () => {
  const navigate = useNavigate();

  const toolNavigation = {
    "Compress PDF": "/compress",
    "Split Page": "/split",
    "Digital Drawing": "/drawing",
    "Signature": "/certificate",
    "Watermarking": "/watermarking",
  };
  
  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-start">
      {/* Heading */}
      <main className="max-w-4xl mx-auto text-center py-12 px-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2">PDFs Successfully Merged!</h1>
        <p className="text-lg text-center text-gray-700 mb-8">ContohNamaArtikel.pdf</p>
      </main>


      {/* Buttons */}
      <div className="flex space-x-8 mb-24">
        <button className="px-8 py-3 bg-[#516A35] text-white text-lg rounded-lg shadow-md hover:bg-[#3F512A]">
          Download File
        </button>
        <button
          className="px-8 py-3 bg-[#516A35] text-white text-lg rounded-lg shadow-md hover:bg-[#3F512A]"
          onClick={() => navigate("/merge-page2")} // Navigate to MergePage2
        >
          Back to Editing
        </button>
      </div>

      {/* Tools */}
      <div className="flex flex-wrap justify-center gap-4 mb-8 bg-[#FCFBFB] p-6 rounded-lg shadow-lg">
        {Object.keys(toolNavigation).map((tool) => (
          <button
            key={tool}
            onClick={() => navigate(toolNavigation[tool])} // Navigate to corresponding page
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

export default MergeSuccess;