import PropTypes from 'prop-types';
import PDFIcon from './assets/PDF.png';
import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import MergePage from './MergePage';
import MergePage2 from './MergePage2'; 
import MergeSuccess from './MergeSuccess';
import Login from './Login';
import CompressPage from './Compress';
import CompressPage2 from './Compress2';
import CompressSuccess from './CompressSuccess';
import SplitPage from './SplitPage';
import SplitPage2 from './SplitPage2';
import SplitSuccess from './SplitSuccess';
import DrawingPage from './DrawingPage';
import DrawingPage2 from './DrawingPage2';
import DrawingSuccess from './DrawingSuccess';
import CertificatePage from './SignPage';
import WatermarkingPage from './Watermarking';
import WatermarkingPage2 from './Watermarking2';
import WatermarkingSuccess from './WatermarkingSuccess';
import Navbar from './Navbar';
import Footer from './Footer';

function ToolCard({ title, description }) {
  const navigate = useNavigate();

  const getPathFromTitle = (title) => {
    switch (title) {
      case 'Compress PDF':
        return '/compress';
      case 'Split Page':
        return '/split';
      case 'Merge Page':
        return '/merge';
      case 'Digital Drawing':
        return '/drawing';
      case 'Signature Certificate':
        return '/certificate';
      case 'Watermarking':
        return '/watermarking';
      default:
        return '/';
    }
  };

  const handleCardClick = () => {
    const path = getPathFromTitle(title);
    navigate(path);
  };

  return (
    <div
      className="border border-gray-200 rounded-lg p-6 hover:shadow-lg cursor-pointer"
      onClick={handleCardClick}
    >
      <div className="flex items-center justify-center mb-4">
        <img src={PDFIcon} alt="icon" className="w-10 h-10" />
      </div>
      <h2 className="text-xl font-semibold mb-2">{title}</h2>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}

ToolCard.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

function HomePage() {
  return (
    <main className="max-w-4xl mx-auto text-center py-12 px-4 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-bold mb-4">All WebPDF Tools</h1>
      <p className="text-gray-600 mb-8">
        Everything you need to manage your PDFs is right here. From merging, splitting, compressing, to adding digital signatures—get it all done in seconds. Free, easy to use, and designed to boost your productivity!
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <ToolCard title="Compress PDF" description="Reduce the file size of your PDFs, making them easier to share." />
        <ToolCard title="Split Page" description="Instantly extract the specific pages you need from a full PDF document." />
        <ToolCard title="Merge Page" description="Easily combine multiple PDF files into one seamless document." />
        <ToolCard title="Digital Drawing" description="Add a secure, legally-binding digital signature to your PDFs for professional use." />
        <ToolCard title="Signature Certificate" description="Your signature is verified, and backed by a trusted certificate for authenticity." />
        <ToolCard title="Watermarking" description="Protect your documents by adding a watermark, just a few clicks." />
      </div>
    </main>
  );
}

function AppContent() {
  const location = useLocation();
  const isLoginPage = location.pathname === '/login';
  const showFooterPages = ['/', '/merge-success', '/compress-success', '/split-success', '/watermarking-success'];

  return (
    <div className="font-sans h-screen flex flex-col">
      {!isLoginPage && <Navbar />} {/* Navbar disembunyikan pada halaman login */}
      <div className="flex-grow">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/merge" element={<MergePage />} />
          <Route path="/merge-page2" element={<MergePage2 />} />
          <Route path="/merge-success" element={<MergeSuccess />} />
          <Route path="/login" element={<Login />} />
          <Route path="/compress" element={<CompressPage />} />
          <Route path="/compress-page2" element={<CompressPage2 />} />
          <Route path="/compress-success" element={<CompressSuccess />} />
          <Route path="/split" element={<SplitPage />} />
          <Route path="/split-page2" element={<SplitPage2 />} />
          <Route path="/split-success" element={<SplitSuccess />} />
          <Route path="/drawing" element={<DrawingPage />} />
          <Route path="/drawing-page2" element={<DrawingPage2 />} />
          <Route path="/drawing-success" element={<DrawingSuccess />} />
          <Route path="/certificate" element={<CertificatePage />} />
          <Route path="/watermarking" element={<WatermarkingPage />} />
          <Route path="/watermarking-page2" element={<WatermarkingPage2 />} />
          <Route path="/watermarking-success" element={<WatermarkingSuccess />} />
        </Routes>
      </div>
      {showFooterPages.includes(location.pathname) && <Footer />}{/* Footer disembunyikan pada halaman login */}
    </div>
  );
}

function App() {
  return (
    <Router>
      <div className="min-h-screen">
        <AppContent />
      </div>
    </Router>
  );
}

export default App;
