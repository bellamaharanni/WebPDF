import { useState, useRef, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import Logo from './assets/PUTILOGO.png';

function Navbar() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const dropdownRef = useRef(null);
  const mobileMenuRef = useRef(null);
  const navigate = useNavigate();

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setDropdownOpen(false);
    }
    if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target)) {
      setMenuOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
  <header className="font-sans flex items-center justify-between px-8 py-4 bg-white shadow-md border-b border-gray-200 sticky top-0 z-50">
    <img src={Logo} alt="PuTI Logo" className="h-8 w-auto" />
      <nav className="flex items-center space-x-6">
        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-6">
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="text-gray-800 font-semibold hover:text-green-600 flex items-center"
            >
              PDF Tools
              <svg className="w-4 h-4 ml-1" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
            {dropdownOpen && (
              <div className="absolute left-0 mt-2 w-60 bg-white border border-gray-200 rounded-md shadow-lg">
                <NavLink
                  to="/compress"
                  className={({ isActive }) => isActive ? "block px-4 py-2 text-customGreen bg-[#EBF5E0]" : "block px-4 py-2 text-gray-800 hover:bg-[#EBF5E0]"}
                >
                  Compress PDF
                </NavLink>
                <NavLink
                  to="/split"
                  className={({ isActive }) => isActive ? "block px-4 py-2 text-customGreen bg-[#EBF5E0]" : "block px-4 py-2 text-gray-800 hover:bg-[#EBF5E0]"}
                >
                  Split Page
                </NavLink>
                <NavLink
                  to="/merge"
                  className={({ isActive }) => isActive ? "block px-4 py-2 text-customGreen bg-[#EBF5E0]" : "block px-4 py-2 text-gray-800 hover:bg-[#EBF5E0]"}
                >
                  Merge Page
                </NavLink>
                <NavLink
                  to="/certificate"
                  className={({ isActive }) => isActive ? "block px-4 py-2 text-customGreen bg-[#EBF5E0]" : "block px-4 py-2 text-gray-800 hover:bg-[#EBF5E0]"}
                >
                  Signature Certificate
                </NavLink>
                <NavLink
                  to="/drawing"
                  className={({ isActive }) => isActive ? "block px-4 py-2 text-customGreen bg-[#EBF5E0]" : "block px-4 py-2 text-gray-800 hover:bg-[#EBF5E0]"}
                >
                  Digital Drawing
                </NavLink>
                <NavLink
                  to="/watermarking"
                  className={({ isActive }) => isActive ? "block px-4 py-2 text-customGreen bg-[#EBF5E0]" : "block px-4 py-2 text-gray-800 hover:bg-[#EBF5E0]"}
                >
                  Watermarking
                </NavLink>
              </div>
            )}
          </div>
          <NavLink to="/" className={({ isActive }) => isActive ? "text-green-600" : "text-gray-800 hover:text-green-600"}>
            Homepage
          </NavLink>
          <NavLink to="/compress" 
            className={({ isActive }) => 
              isActive || window.location.pathname.startsWith('/compress')
                ? "text-green-600" 
                : "text-gray-800 hover:text-green-600"
              }>
            Compress PDF
          </NavLink>
          <NavLink
            to="/split"
            className={({ isActive }) =>
              isActive || window.location.pathname.startsWith('/split')
                ? "text-green-600"
                : "text-gray-800 hover:text-green-600"
            }>
            Split Page
          </NavLink>
          <NavLink
            to="/merge"
            className={({ isActive }) =>
              isActive || window.location.pathname.startsWith('/merge')
                ? "text-green-600"
                : "text-gray-800 hover:text-green-600"
            }>
            Merge Page
          </NavLink>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-gray-800 hover:text-green-600"
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M3 5h14a1 1 0 110 2H3a1 1 0 110-2zM3 10h14a1 1 0 110 2H3a1 1 0 110-2zM3 15h14a1 1 0 110 2H3a1 1 0 110-2z" clipRule="evenodd" />
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div ref={mobileMenuRef} className="absolute top-0 left-0 w-full bg-white shadow-lg md:hidden z-50">
            <NavLink
              to="/"
              className="block px-4 py-2 text-gray-800 hover:bg-[#3F512A]"
            >
              Homepage
            </NavLink>
            <NavLink
              to="/compress"
              className="block px-4 py-2 text-gray-800 hover:bg-[#3F512A]"
            >
              Compress PDF
            </NavLink>
            <NavLink
              to="/split"
              className="block px-4 py-2 text-gray-800 hover:bg-[#3F512A]"
            >
              Split Page
            </NavLink>
            <NavLink
              to="/merge"
              className="block px-4 py-2 text-gray-800 hover:bg-[#3F512A]"
            >
              Merge Page
            </NavLink>
            <NavLink
              to="/certificate"
              className="block px-4 py-2 text-gray-800 hover:bg-[#3F512A]"
            >
              Signature Certificate
            </NavLink>
            <NavLink
              to="/drawing"
              className="block px-4 py-2 text-gray-800 hover:bg-[#3F512A]"
            >
              Digital Drawing
            </NavLink>
            <NavLink
              to="/watermarking"
              className="block px-4 py-2 text-gray-800 hover:bg-[#3F512A]"
            >
              Watermarking
            </NavLink>
          </div>
        )}
      </nav>
      <button
        onClick={() => navigate('/login')}
        className="px-4 py-2 bg-[#516A35] text-white rounded-lg hover:bg-[#3F512A]"
      >
        Sign In
      </button>
    </header>
  );
}

export default Navbar;