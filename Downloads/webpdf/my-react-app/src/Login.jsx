import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    // Simulate login success for testing purposes
    console.log("Login simulated successfully, redirecting to HomePage...");
    navigate("/"); // Redirect to HomePage
  };

  const toggleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="bg-white p-8 md:p-10 rounded shadow-lg w-full max-w-md text-center">
        <h1 className="text-4xl font-bold mb-4" style={{ color: "#516A35" }}>Welcome to WebPDF</h1>
        <p className="text-gray-600 mb-8">Streamline your PDF tasks effortlessly with our all-in-one tool, designed for seamless merging, compressing, signing, and more!</p>
        
        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <input 
            type="email" 
            placeholder="E-mail" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            className="p-3 border rounded focus:outline-none"
            style={{ borderColor: "#516A35" }}
            required
          />
          
          <div className="relative">
            <input 
              type={showPassword ? "text" : "password"} 
              placeholder="Password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              className="p-3 border rounded w-full focus:outline-none"
              style={{ borderColor: "#516A35" }}
              required
            />
            <button
              type="button"
              onClick={toggleShowPassword}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600 focus:outline-none"
            >
              {showPassword ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13.875 18.825A10.05 10.05 0 0112 19c-5 0-9-5-9-5s2.58-3.92 7-4.8m9 3.8c1.308.285 2.485.75 3.5 1.357M19 12a7 7 0 00-14 0c0 1.179.225 2.304.625 3.3m4.75 3.2c.85.349 1.745.5 2.625.5 4.42 0 7-4 7-4s-2.58-3.92-7-4.8"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0zm9 0c0-1.5-4.5-9-12-9S0 10.5 0 12s4.5 9 12 9 12-7.5 12-9z"
                  />
                </svg>
              )}
            </button>
          </div>

          <button 
            type="submit" 
            className="py-2 rounded text-white w-full mt-4 bg-[#516A35] hover:bg-[#3F512A]"
          >
            Log In
          </button>
        </form>
        
        <a href="#" className="mt-4 inline-block" style={{ color: "#516A35" }}>Forgot your password?</a>
      </div>
    </div>
  );
};

export default Login;