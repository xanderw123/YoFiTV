export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center gap-8 p-4">
      <div className="text-center">
        <h1 className="text-5xl font-bold mb-4">Always On</h1>
        <p className="text-xl text-gray-400 mb-8">
          Curate Your World. Cultivate Your Life.
        </p>
        <div className="flex gap-4 justify-center">
          <a href="/stations" className="px-6 py-2 bg-yellow-300 text-black rounded-lg font-bold hover:bg-yellow-400">
            Browse Stations
          </a>
          <a href="/dashboard" className="px-6 py-2 bg-gray-800 text-white rounded-lg font-bold hover:bg-gray-700">
            Create Station
          </a>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mt-12">
        <div className="bg-gray-900 rounded-lg p-6 text-center">
          <div className="text-4xl mb-4">🎬</div>
          <h3 className="font-bold mb-2">Your Content</h3>
          <p className="text-sm text-gray-400">
            Upload your videos and create your 24/7 station
          </p>
        </div>
        
        <div className="bg-gray-900 rounded-lg p-6 text-center">
          <div className="text-4xl mb-4">👥</div>
          <h3 className="font-bold mb-2">Your Audience</h3>
          <p className="text-sm text-gray-400">
            Build your community with tips, chat, and subscriptions
          </p>
        </div>
        
        <div className="bg-gray-900 rounded-lg p-6 text-center">
          <div className="text-4xl mb-4">💰</div>
          <h3 className="font-bold mb-2">Your Money</h3>
          <p className="text-sm text-gray-400">
            Keep 90% of tips, 70% of ads, 90% of subscriptions
          </p>
        </div>
      </div>
    </div>
  )
}
