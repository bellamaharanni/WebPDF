import { useNavigate } from 'react-router-dom';

const SplitPage = () => {
  const navigate = useNavigate();

  const handleChooseFileClick = () => {
    navigate("/split-page2"); // Navigasi ke halaman selanjutnya
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-start">
      <main className="max-w-4xl mx-auto text-center py-12 px-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">Split Page</h1>
        <p className="text-gray-600 mb-8">
          Instantly extract the specific pages you need from a full PDF document.
        </p>

        <div className="bg-[#EBF5E0] rounded-lg p-8 sm:p-12 md:p-16 lg:p-20 w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl flex flex-col items-center">
          <div className="button-background-container bg-[#EBF5E0] rounded-lg py-8 flex flex-col items-center">
            <button 
              onClick={handleChooseFileClick}
              className="bg-[#516A35] text-white py-3 px-8 w-48 rounded-lg shadow-lg hover:bg-[#3F512A] focus:outline-none focus:ring-4 focus:ring-[#516A35] focus:ring-opacity-50"
            >
              Choose File
            </button>
            <p className="mt-2 text-gray-500 text-xs">or drag files here</p>
          </div>
        </div>
      </main>
    </div>
  );
};
export default SplitPage;