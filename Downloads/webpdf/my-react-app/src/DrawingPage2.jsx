import ShowIcon from './assets/showpages.png';
import AddIcon from './assets/addfiles.png';
import SortIcon from './assets/sortfiles.png';

const DrawingPage2 = () => {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-start">
      {/* Header */}
      <main className="max-w-4xl mx-auto text-center py-12 px-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2">Digital Drawing</h1>
      </main>

      {/* Button Group */}
      <div className="flex flex-col sm:flex-row gap-4 -mt-2">
        <button className="px-4 py-2 bg-[#EBF5E0] text-gray-800 rounded-lg flex items-center justify-center hover:bg-[rgba(227,241,212,1)] shadow-lg border border-[#D9D9D9]">
          <img src={ShowIcon} alt="Show Pages" className="w-6 h-6 mr-2" /> Show Pages
        </button>
        <button className="px-4 py-2 bg-[#EBF5E0] text-gray-800 rounded-lg flex items-center justify-center hover:bg-[rgba(227,241,212,1)] shadow-lg border border-[#D9D9D9]">
          <img src={AddIcon} alt="Add Files" className="w-6 h-6 mr-2" /> Add Text
        </button>
        <button className="px-4 py-2 bg-[#EBF5E0] text-gray-800 rounded-lg flex items-center justify-center hover:bg-[rgba(227,241,212,1)] shadow-lg border border-[#D9D9D9]">
          <img src={SortIcon} alt="Sort Files" className="w-6 h-6 mr-2" /> Add Sign
        </button>
        <button className="px-4 py-2 bg-[#EBF5E0] text-gray-800 rounded-lg flex items-center justify-center hover:bg-[rgba(227,241,212,1)] shadow-lg border border-[#D9D9D9]">
          <img src={SortIcon} alt="Sort Files" className="w-6 h-6 mr-2" /> Add Image
        </button>
      </div>


      {/* Drawing Button */}
      <div className="bg-gray-50 border-t border-gray-200 w-full flex justify-center fixed bottom-0 py-6">
        <button className="px-10 py-3 bg-[#516A35] text-white rounded-lg shadow-xl hover:bg-[#3F512A]">
          Digital Drawing
        </button>
      </div>
    </div>
  );
};

export default DrawingPage2;