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

      {/* Info Sections */}
      <div className="w-full max-w-4xl space-y-6 md:space-y-8">
        {/* Section 1 */}
        <div className="border-2 border-yofi-green rounded-lg p-6 md:p-8">
          <h2 className="text-2xl md:text-3xl font-bold mb-4 text-center">Curate Your World. Cultivate Your Life.</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
            {/* Left Column */}
            <div className="border-2 border-yofi-green rounded-lg p-4 md:p-6 text-center">
              <h3 className="text-lg md:text-xl font-bold mb-4">Bringing Back The Magic.</h3>
              <div className="flex justify-center mb-6">
                <div className="w-16 h-16 md:w-20 md:h-20 border-2 border-yofi-green rounded-lg flex items-center justify-center">
                  <svg className="w-8 h-8 md:w-10 md:h-10 text-yofi-green" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z"/>
                  </svg>
                </div>
              </div>
              <p className="text-sm md:text-base text-gray-300 mb-6">The Comfort of Nostalgia</p>
              <p className="text-xs md:text-sm text-gray-400 mb-6">Experience 24/7 YoFi TV Stations that run constant Rotations. Always On. Navigate using our YoFi TV Guide. The algorithm isn't the star. You are.</p>
              <h4 className="font-bold mb-3 text-sm md:text-base">Sign up to Curate Your World</h4>
              <p className="text-xs md:text-sm text-gray-400 mb-4">Customize your viewer experience and Curate your favorite Stations</p>
              <p className="text-xs md:text-sm font-bold mb-4">No sign-up necessary.</p>
              <p className="text-xs md:text-sm text-gray-400">Just Turn On, Tune In, and Chill Out.</p>
            </div>

            {/* Center Column */}
            <div className="border-2 border-yofi-green rounded-lg p-4 md:p-6 text-center">
              <h3 className="text-lg md:text-xl font-bold mb-4">Your Content. Your Audience. Your Money.</h3>
              <div className="flex justify-center mb-6">
                <svg className="w-16 h-16 md:w-20 md:h-20 text-yofi-green" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M13 6l.5 1h6v10h-16v-10h6l.5-1h3zm-6 4v4h8v-4h-8z"/>
                </svg>
              </div>
              <p className="text-sm md:text-base text-gray-300 mb-6">YoFi TV Station Hosts Keep:</p>
              <div className="space-y-3 text-xs md:text-sm text-gray-400">
                <p><span className="font-bold">70%</span> of Ad Revenue<br/><span className="text-gray-500">(Compare to: Youtube 55%)</span></p>
                <p><span className="font-bold">90%</span> of Premium Subscriptions<br/><span className="text-gray-500">(Compare to: Twitch 50%)</span></p>
                <p><span className="font-bold">90%</span> of Appreciations<br/><span className="text-gray-500">(Compare to: Youtube 49%, Patreon up to 12%)</span></p>
              </div>
              <h4 className="font-bold mt-6 mb-3 text-sm md:text-base">Make Money while you sleep.</h4>
              <p className="text-xs md:text-sm text-gray-400">Your Rotation runs 24/7, earning revenue from ads</p>
            </div>

            {/* Right Column */}
            <div className="border-2 border-yofi-green rounded-lg p-4 md:p-6 text-center">
              <h3 className="text-lg md:text-xl font-bold mb-4">Cultivate With YoFi TV.</h3>
              <div className="space-y-6">
                <div>
                  <svg className="w-12 h-12 md:w-16 md:h-16 text-yofi-green mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.856-1.487M15 10a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <p className="text-xs md:text-sm font-bold mb-1">Grow Your Audience.</p>
                  <p className="text-xs text-gray-400 text-center"></p>
                </div>

                <div>
                  <svg className="w-12 h-12 md:w-16 md:h-16 text-yofi-green mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v12a2 2 0 01-2 2h-3l-4 4z" />
                  </svg>
                  <p className="text-xs md:text-sm font-bold mb-1">Turn on Conversations</p>
                  <p className="text-xs text-gray-400">to Build your Community.</p>
                </div>

                <div>
                  <svg className="w-12 h-12 md:w-16 md:h-16 text-yofi-green mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <p className="text-xs md:text-sm font-bold mb-1">Add a Premium Subscription</p>
                  <p className="text-xs text-gray-400">offering ad free content.<br/>Set your own price</p>
                </div>

                <div>
                  <svg className="w-12 h-12 md:w-16 md:h-16 text-yofi-green mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                  <p className="text-xs md:text-sm font-bold mb-1">Receive Appreciations</p>
                  <p className="text-xs text-gray-400">from your most<br/>dedicated Supporters.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 text-center space-y-3">
            <p className="text-sm md:text-base font-bold">Watch Passively.</p>
            <p className="text-sm md:text-base font-bold">Monteize Passively.</p>
          </div>
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