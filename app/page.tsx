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
        <img 
          src="/images/Homepage_Information_2.png" 
          alt="MyStation Coming Soon" 
          className="w-full h-auto rounded-lg"
        />
      </div>
    </div>
  )
}