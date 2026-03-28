'use client'

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
          src="/images/Homepage_Information.png" 
          alt="YoFi TV Information" 
          className="w-full h-auto rounded-lg"
        />

        {/* Updated Pricing Comparison */}
        <div className="border-2 border-yofi-green rounded-lg p-6 md:p-8 bg-gray-950">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">The Best Payouts in Streaming</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Ad Revenue */}
            <div className="border-2 border-yofi-green rounded-lg p-6 text-center">
              <h3 className="text-xl md:text-2xl font-bold mb-4 text-yofi-green">Ad Revenue</h3>
              <div className="space-y-4">
                <div>
                  <p className="text-3xl md:text-4xl font-bold text-yofi-green">70%</p>
                  <p className="text-sm text-gray-400">YoFi TV</p>
                </div>
                <div className="space-y-2 text-sm text-gray-400 pt-4 border-t border-gray-700">
                  <div className="flex justify-between">
                    <span>YouTube</span>
                    <span className="font-bold">55%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Twitch</span>
                    <span className="font-bold">50%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Dailymotion</span>
                    <span className="font-bold">55%</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Premium Subscriptions & Appreciations */}
            <div className="border-2 border-yofi-green rounded-lg p-6 text-center">
              <h3 className="text-xl md:text-2xl font-bold mb-4 text-yofi-green">Premium + Tips</h3>
              <div className="space-y-4">
                <div>
                  <p className="text-3xl md:text-4xl font-bold text-yofi-green">95%</p>
                  <p className="text-sm text-gray-400">YoFi TV</p>
                </div>
                <div className="space-y-2 text-sm text-gray-400 pt-4 border-t border-gray-700">
                  <div className="flex justify-between">
                    <span>Twitch Subs</span>
                    <span className="font-bold">50%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>YouTube Members</span>
                    <span className="font-bold">70%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Patreon</span>
                    <span className="font-bold">up to 12%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Ko-fi</span>
                    <span className="font-bold">up to 20%</span>
                  </div>
                </div>
              </div>
            </div>

            {/* The Difference */}
            <div className="border-2 border-yofi-green rounded-lg p-6 text-center">
              <h3 className="text-xl md:text-2xl font-bold mb-4 text-yofi-green">Why It Matters</h3>
              <div className="space-y-3 text-sm text-gray-300">
                <p><span className="font-bold text-yofi-green">15%+ more</span> from ads than YouTube or Twitch</p>
                <p><span className="font-bold text-yofi-green">25%+ more</span> from subscriptions than Twitch</p>
                <p><span className="font-bold text-yofi-green">75%+ more</span> from tips than Patreon</p>
                <p className="pt-3 border-t border-gray-700">Make real money while you sleep. Your rotation runs 24/7.</p>
              </div>
            </div>
          </div>
        </div>

        <img 
          src="/images/Homepage_Information_2.png" 
          alt="MyStation Coming Soon" 
          className="w-full h-auto rounded-lg"
        />
      </div>
    </div>
  )
}