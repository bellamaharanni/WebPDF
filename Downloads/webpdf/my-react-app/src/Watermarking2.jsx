import ShowIcon from './assets/showpages.png';
import AddIcon from './assets/addfiles.png';
import SortIcon from './assets/sortfiles.png';
import { useState } from 'react';
import { useNavigate } from "react-router-dom";

const WatermarkingPage2 = () => {
  const navigate = useNavigate(); // Hook untuk navigasi
  const [opacity, setOpacity] = useState(40);
  const [rotation, setRotation] = useState(320);
  const [selectedFont, setSelectedFont] = useState('Arial');
  const [fontSize, setFontSize] = useState(16);
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [isUnderline, setIsUnderline] = useState(false);
  const [watermarkText, setWatermarkText] = useState('Contoh Watermark'); 
  const [fontColor, setFontColor] = useState('#516A35'); 

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-start pb-32">
      {/* Header */}
      <main className="max-w-4xl mx-auto text-center py-12 px-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2">Watermarking Page</h1>
      </main>

      {/* Button Group */}
      <div className="flex flex-wrap sm:flex-row gap-4 -mt-2">
        <button className="px-4 py-2 bg-[#EBF5E0] text-gray-800 rounded-lg flex items-center justify-center hover:bg-[rgba(227,241,212,1)] shadow-lg border border-[#D9D9D9]">
          <img src={ShowIcon} alt="Show Pages" className="w-6 h-6 mr-2" /> Show Pages
        </button>
        <button className="px-4 py-2 bg-[#EBF5E0] text-gray-800 rounded-lg flex items-center justify-center hover:bg-[rgba(227,241,212,1)] shadow-lg border border-[#D9D9D9]">
          <img src={AddIcon} alt="Add Files" className="w-6 h-6 mr-2" /> Add Files
        </button>
        <button className="px-4 py-2 bg-[#EBF5E0] text-gray-800 rounded-lg flex items-center justify-center hover:bg-[rgba(227,241,212,1)] shadow-lg border border-[#D9D9D9]">
          <img src={SortIcon} alt="Sort Files" className="w-6 h-6 mr-2" /> Add Images
        </button>
      </div>

      {/* Main Content */}
      <div className="flex flex-col lg:flex-row w-full max-w-6xl mt-8 gap-8 px-4">
        {/* Preview PDF */}
        <div className="flex-1 border rounded-lg overflow-hidden shadow p-4">
          <div
            className="w-full h-60 flex items-center justify-center"
            style={{
              fontFamily: selectedFont,
              fontSize: `${fontSize}px`,
              fontWeight: isBold ? 'bold' : 'normal',
              fontStyle: isItalic ? 'italic' : 'normal',
              textDecoration: isUnderline ? 'underline' : 'none',
              color: fontColor,
              userSelect: 'none',
              opacity: opacity / 100,
              transform: `rotate(${rotation}deg)`,
            }}
          >
            {watermarkText}
          </div>
        </div>

        {/* Watermark Controls */}
        <div className="w-full lg:w-1/3 space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2">Text:</label>
            <input
              type="text"
              placeholder="ContohWatermark"
              value={watermarkText}
              onChange={(e) => setWatermarkText(e.target.value)}
              className="w-full px-4 py-2 border rounded focus:ring focus:ring-green-300"
            />
          </div>

          {/* Font Control */}
          <div>
            <label className="block text-sm font-medium mb-2">Font Control:</label>
            <div className="grid grid-cols-2 gap-4">
              <select
                className="w-full px-4 py-2 border rounded focus:ring focus:ring-green-300 bg-gray-50 text-gray-700"
                value={selectedFont}
                onChange={(e) => setSelectedFont(e.target.value)}
              >
                <option value="Arial">Arial</option>
                <option value="Times New Roman">Times New Roman</option>
                <option value="Courier New">Courier New</option>
                <option value="Verdana">Verdana</option>
                <option value="Georgia">Georgia</option>
              </select>

              <div className="flex items-center space-x-2">
                {/* Bold */}
                <button
                  className={`w-12 h-12 flex items-center justify-center border rounded shadow-md ${
                    isBold ? 'bg-[#EBF5E0] text-gray-800' : 'bg-gray-100 text-gray-600'
                  } hover:bg-[#EBF5E0] active:scale-95 transition-all duration-200`}
                  onClick={() => setIsBold(!isBold)}
                >
                  <span className="font-bold text-xl">B</span>
                </button>

                {/* Italic */}
                <button
                  className={`w-12 h-12 flex items-center justify-center border rounded shadow-md ${
                    isItalic ? 'bg-[#EBF5E0] text-gray-800' : 'bg-gray-100 text-gray-600'
                  } hover:bg-[#EBF5E0] active:scale-95 transition-all duration-200`}
                  onClick={() => setIsItalic(!isItalic)}
                >
                  <span className="italic text-xl">I</span>
                </button>

                {/* Underline */}
                <button
                  className={`w-12 h-12 flex items-center justify-center border rounded shadow-md ${
                    isUnderline ? 'bg-[#EBF5E0] text-gray-800' : 'bg-gray-100 text-gray-600'
                  } hover:bg-[#EBF5E0] active:scale-95 transition-all duration-200`}
                  onClick={() => setIsUnderline(!isUnderline)}
                >
                  <span className="underline text-xl">U</span>
                </button>
              </div>
            </div>

            {/* Font Size and Font Color */}
            <div className="mt-4 flex items-center justify-between">
              <div>
                <label className="block text-sm font-medium mb-2">Font Size:</label>
                <input
                  type="number"
                  value={fontSize}
                  onChange={(e) => setFontSize(e.target.value)}
                  min="8"
                  max="72"
                  step="1"
                  className="w-24 px-2 py-1 border rounded focus:ring focus:ring-green-300 text-center"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Font Color:</label>
                <input
                  type="color"
                  value={fontColor}
                  onChange={(e) => setFontColor(e.target.value)}
                  className="w-12 h-12 border rounded focus:ring focus:ring-green-300"
                />
              </div>
            </div>
          </div>
          
          {/* Location on Page */}
          <div>
            <label className="block text-sm font-medium mb-2">Location on Page:</label>
            <div className="flex items-center space-x-4">
              <label className="flex items-center">
                <input type="radio" name="location" className="mr-2" /> Centered
              </label>
              <label className="flex items-center">
                <input type="radio" name="location" className="mr-2" /> Custom
              </label>
            </div>
          </div>

          {/* Opacity and Rotation */}
          <div>
            <label className="block text-sm font-medium mb-2">Opacity:</label>
            <input
              type="range"
              min="0"
              max="100"
              value={opacity}
              onChange={(e) => setOpacity(e.target.value)}
              className="w-full accent-[#516A35]"
            />
            <div className="text-right text-sm text-[#516A35]">{opacity}%</div>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Rotation:</label>
            <input
              type="range"
              min="0"
              max="360"
              value={rotation}
              onChange={(e) => setRotation(e.target.value)}
              className="w-full accent-[#516A35]"
            />
            <div className="text-right text-sm text-[#516A35]">{rotation}°</div>
          </div>

          {/* Preview Page */}
          <div>
            <label className="block text-sm font-medium mb-2">Preview Page:</label>
            <input
              type="number"
              min="1"
              className="w-full px-4 py-2 border rounded focus:ring focus:ring-green-300"
              placeholder="1"
            />
          </div>

          {/* Watermark Specific Page */}
          <div>
            <label className="block text-sm font-medium mb-2">Watermark Specific Page:</label>
            <input
              type="text"
              className="w-full px-4 py-2 border rounded focus:ring focus:ring-green-300"
              placeholder="Example, 1-3, 7"
            />
          </div>
        </div>
      </div>

      {/* Watermarking Button */}
      <div className="bg-gray-50 border-t border-gray-200 w-full flex justify-center fixed bottom-0 py-6">
        <button
          className="px-10 py-3 bg-[#516A35] text-white rounded-lg shadow-xl hover:bg-[#3F512A]"
          onClick={() => navigate("/watermarking-success")} // Navigasi ke halaman WatermarkingSuccess
        >
          Watermarking
        </button>
      </div>
    </div>
  );
};

export default WatermarkingPage2;