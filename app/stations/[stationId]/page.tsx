// app/stations/[stationId]/page.tsx

'use client';

import Link from 'next/link';
import { DEMO_STATIONS } from '@/lib/demo-data';

export default function StationDetailPage({
  params,
}: {
  params: { stationId: string };
}) {
  const stationId = params.stationId;
  const station = DEMO_STATIONS.find((s) => s.id === stationId);

  if (!station) {
    return (
      <div className="station-not-found">
        <h1>Station Not Found</h1>
        <Link href="/guide">← Back to Guide</Link>
      </div>
    );
  }

  return (
    <main className="station-detail-page">
      <div className="station-detail-container">
        {/* Back Button */}
        <Link href="/guide" className="back-link">
          ← Back to Guide
        </Link>

        {/* Station Header */}
        <div className="station-header-detail">
          <div className="station-image-detail">
            <img src={station.logo} alt={station.name} />
          </div>

          <div className="station-info-detail">
            <h1>{station.name}</h1>
            <p className="station-subtitle-detail">{station.subtitle}</p>
            <p className="station-description-detail">
              {station.description}
            </p>

            {/* Categories */}
            <div className="station-categories-detail">
              {station.categories.map((cat) => (
                <span key={cat} className="category-tag-detail">
                  {cat}
                </span>
              ))}
            </div>

            {/* Controls */}
            <div className="station-controls-detail">
              <button
                className="control-btn-detail disabled"
                disabled
                title="Coming in Phase 1"
              >
                <img src="/icons/follow.svg" alt="Follow" />
                <span>Follow</span>
              </button>

              <button
                className="control-btn-detail disabled"
                disabled
                title="Coming in Phase 1"
              >
                <img src="/icons/Appreciation.svg" alt="Appreciate" />
                <span>Appreciate</span>
              </button>

              <button
                className="control-btn-detail disabled"
                disabled
                title="Coming in Phase 1"
              >
                <img src="/icons/conversation.svg" alt="Chat" />
                <span>Chat</span>
              </button>

              <button
                className="control-btn-detail disabled"
                disabled
                title="Coming in Phase 1"
              >
                <img src="/icons/subscribe.svg" alt="Subscribe" />
                <span>Subscribe</span>
              </button>
            </div>
          </div>
        </div>

        {/* About Section */}
        <div className="station-about-detail">
          <h3>About This Station</h3>
          <p>{station.about}</p>
        </div>

        {/* Videos Section */}
        <div className="station-videos-detail">
          <h3>Videos</h3>
          <div className="videos-list">
            {station.videos.map((video) => (
              <div key={video.id} className="video-item">
                <p className="video-title">{video.title}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}