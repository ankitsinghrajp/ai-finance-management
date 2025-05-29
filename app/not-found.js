"use client"

import Link from "next/link";

const NotFound = () => {

  return (
    <div className="flex flex-col items-center py-20 justify-center min-h-screen bg-gradient-to-b from-gray-900 to-black text-white p-4">
      <div className="max-w-2xl w-full flex flex-col items-center">
        {/* Animated SVG */}
        <div className="mb-6 w-64 h-64">
          <svg 
            viewBox="0 0 100 100" 
            className="w-full h-full"
          >
            {/* Orbiting circles */}
            <circle 
              cx="50" 
              cy="50" 
              r="40" 
              stroke="#3B82F6" 
              strokeWidth="0.5" 
              fill="none" 
              opacity="0.3"
            />
            <circle 
              cx="50" 
              cy="50" 
              r="30" 
              stroke="#8B5CF6" 
              strokeWidth="0.5" 
              fill="none" 
              opacity="0.3"
            />
            <circle 
              cx="50" 
              cy="50" 
              r="20" 
              stroke="#EC4899" 
              strokeWidth="0.5" 
              fill="none" 
              opacity="0.3"
            />
            
            {/* Animated particles */}
            <circle className="animate-pulse">
              <animateMotion
                path="M0,0 a40,40 0 1,1 0,0.1 z"
                dur="8s"
                repeatCount="indefinite"
              />
              <animate
                attributeName="r"
                values="1;2;1"
                dur="3s"
                repeatCount="indefinite"
              />
              <animate
                attributeName="fill"
                values="#3B82F6;#8B5CF6;#EC4899;#3B82F6"
                dur="12s"
                repeatCount="indefinite"
              />
            </circle>
            
            <circle className="animate-pulse">
              <animateMotion
                path="M0,0 a30,30 0 1,0 0,0.1 z"
                dur="6s"
                repeatCount="indefinite"
              />
              <animate
                attributeName="r"
                values="1;2;1"
                dur="4s"
                repeatCount="indefinite"
              />
              <animate
                attributeName="fill"
                values="#8B5CF6;#EC4899;#3B82F6;#8B5CF6"
                dur="10s"
                repeatCount="indefinite"
              />
            </circle>
            
            <circle className="animate-pulse">
              <animateMotion
                path="M0,0 a20,20 0 1,1 0,0.1 z"
                dur="4s"
                repeatCount="indefinite"
              />
              <animate
                attributeName="r"
                values="1;2;1"
                dur="5s"
                repeatCount="indefinite"
              />
              <animate
                attributeName="fill"
                values="#EC4899;#3B82F6;#8B5CF6;#EC4899"
                dur="8s"
                repeatCount="indefinite"
              />
            </circle>
            
            {/* Central 404 */}
            <text 
              x="50" 
              y="55" 
              textAnchor="middle" 
              fontSize="16" 
              fontWeight="bold" 
              fill="#ffffff"
            >
              404
            </text>
          </svg>
        </div>
        
        {/* Text Content */}
        <h1 className="text-4xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500">
          Page Not Found
        </h1>
        
        <p className="text-lg text-gray-300 text-center mb-8 max-w-md">
          The page you&apos;re looking for seems to have drifted into another dimension.
        </p>
        
        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4">
          <Link 
            href="/" 
            className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg text-white font-medium hover:opacity-90 transition-opacity focus:ring-2 focus:ring-purple-400 focus:outline-none"
          >
            Return Home
          </Link>
          
          <button 
              onClick={() => window.history.back()} 
              className="px-6 py-3 bg-transparent border border-gray-500 rounded-lg text-gray-300 font-medium hover:bg-gray-800 transition-colors focus:ring-2 focus:ring-gray-400 focus:outline-none"
            >
              Go Back
            </button>
        </div>
      </div>
      
      {/* Footer */}
      <div className="mt-16 text-gray-500 text-sm">
        <p>Lost? Try searching or navigating from our homepage.</p>
      </div>
    </div>
  );
};

export default NotFound;