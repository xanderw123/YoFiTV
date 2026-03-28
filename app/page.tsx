'use client'

import Image from 'next/image'

export default function Home() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center gap-8 md:gap-12 p-4 md:p-8">
      {/* Always On Logo - Much Larger */}
      <div className="w-full max-w-md md:max-w-2xl">
        <img 
          src="/logos/YoFi TV - Always On.svg" 
          alt="YoFi TV - Always On" 
          className="w-full h-auto"
        />
      </div>

      {/* Info Sections - Using PNG Images */}
      <div className="w-full max-w-4xl space-y-6 md:space-y-8">
        <img 
          src="/images/homepage-info-1.png" 
          alt="YoFi TV Information" 
          className="w-full h-auto rounded-lg"
        />
        <img 
          src="/images/homepage-info-2.png" 
          alt="MyStation Coming Soon" 
          className="w-full h-auto rounded-lg"
        />
      </div>

        {/* Coming Soon Section */}
        <div className="border-2 border-yofi-green rounded-lg p-6 md:p-8 bg-gray-950">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-6 uppercase tracking-wider">Coming Soon</h2>
          <div className="flex flex-col md:flex-row items-center gap-6 md:gap-8">
            <div className="flex-shrink-0">
              <svg className="w-20 h-20 md:w-24 md:h-24 text-yofi-green" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm0-13c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5z"/>
              </svg>
            </div>
            <div className="flex-1 text-center md:text-left">
              <h3 className="text-xl md:text-2xl font-bold mb-2">MyStation</h3>
              <p className="text-sm md:text-base text-gray-300">Customize your Station and Build your Rotation.</p>
              <ul className="text-xs md:text-sm text-gray-400 mt-3 space-y-1">
                <li>• Upload Video, create Station Bumpers, place Ad Breaks</li>
                <li>• Upload Audio, use images or Themes.</li>
                <li>• Customize you Station's color, font, and preferences</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}