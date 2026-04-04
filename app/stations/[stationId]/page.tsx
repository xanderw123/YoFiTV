// app/stations/[stationId]/page.tsx

'use client';

import Link from 'next/link';
import { useState } from 'react';
import { DEMO_STATIONS } from '@/lib/demo-data';

export default function StationDetailPage({
  params,
}: {
  params: { stationId: string };
}) {
  const stationId = params.stationId;
  const station = DEMO_STATIONS.find((s) => s.id === stationId);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);

  if (!station) {
    return (
      <div className="station-not-found">
        <h1>Station Not Found</h1>
        <Link href="/guide">← Back to Guide</Link>
      </div>
    );
  }

  const currentVideo = station.videos[currentVideoIndex];

  // Extract YouTube video ID from URL
  const getYouTubeId = (url) => {
    const regex =
      /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/;
    const match = url.match(regex);
    return match ? match[1] : '';
  };

  const youtubeId = getYouTubeId(currentVideo.url);

  return (
    <main className="station-detail-page-v2">
      <div className="station-detail-container-v2">
        {/* Back Button */}
        <Link href="/guide" className="back-link-v2">
          ← Back to Guide
        </Link>

        {/* Video Player Section */}
        <div className="video-section">
          <div className="video-player-container">
            {youtubeId ? (
              <iframe
                className="youtube-player"
                src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1&controls=1&modestbranding=1`}
                title={currentVideo.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            ) : (
              <div className="video-placeholder">
                <p>Video not available</p>
              </div>
            )}
          </div>

          <div className="now-playing-info">
            <h2>Now Playing</h2>
            <p className="now-playing-title">{currentVideo.title}</p>
            <p className="now-playing-station">{station.name}</p>
          </div>
        </div>

        {/* Station Info Section */}
        <div className="station-info-section">
          <div className="station-header-v2">
            <div className="station-logo-v2">
              <img src={station.logo} alt={station.name} />
            </div>

            <div className="station-details-v2">
              <h1>{station.name}</h1>
              <p className="subtitle-v2">{station.subtitle}</p>
              <p className="description-v2">{station.description}</p>

              {/* Categories */}
              <div className="categories-v2">
                {station.categories.map((cat) => (
                  <span key={cat} className="category-v2">
                    {cat}
                  </span>
                ))}
              </div>

              {/* Controls */}
              <div className="controls-v2">
                <button
                  className="control-btn-v2 disabled"
                  disabled
                  title="Coming in Phase 1"
                >
                  <img src="/icons/follow.svg" alt="Follow" />
                  Follow
                </button>

                <button
                  className="control-btn-v2 disabled"
                  disabled
                  title="Coming in Phase 1"
                >
                  <img src="/icons/Appreciation.svg" alt="Appreciate" />
                  Appreciate
                </button>

                <button
                  className="control-btn-v2 disabled"
                  disabled
                  title="Coming in Phase 1"
                >
                  <img src="/icons/conversation.svg" alt="Chat" />
                  Chat
                </button>

                <button
                  className="control-btn-v2 disabled"
                  disabled
                  title="Coming in Phase 1"
                >
                  <img src="/icons/subscribe.svg" alt="Subscribe" />
                  Subscribe
                </button>
              </div>
            </div>
          </div>

          {/* About */}
          <div className="about-section-v2">
            <h3>About</h3>
            <p>{station.about}</p>
          </div>
        </div>

        {/* Videos Playlist */}
        <div className="playlist-section">
          <h3>Up Next</h3>
          <div className="playlist-grid">
            {station.videos.map((video, index) => (
              <button
                key={video.id}
                className={`playlist-item ${
                  currentVideoIndex === index ? 'active' : ''
                }`}
                onClick={() => setCurrentVideoIndex(index)}
              >
                <div className="playlist-number">{index + 1}</div>
                <p className="playlist-title">{video.title}</p>
              </button>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}