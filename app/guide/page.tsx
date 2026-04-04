// app/guide/page.tsx

'use client';

import Link from 'next/link';
import { DEMO_STATIONS } from '@/lib/demo-data';

export default function GuidePage() {
  // Time slots for the guide
  const timeSlots = [
    '12:00 AM',
    '2:00 AM',
    '4:00 AM',
    '6:00 AM',
    '8:00 AM',
    '10:00 AM',
    '12:00 PM',
    '2:00 PM',
    '4:00 PM',
    '6:00 PM',
    '8:00 PM',
    '10:00 PM',
  ];

  const getVideoForSlot = (stationIndex: number, slotIndex: number) => {
    const station = DEMO_STATIONS[stationIndex];
    const videoIndex = slotIndex % station.videos.length;
    return station.videos[videoIndex];
  };

  const getStationForSlot = (slotIndex: number) => {
    return DEMO_STATIONS[slotIndex % DEMO_STATIONS.length];
  };

  // Get "now playing" (first slot, first station)
  const nowPlayingStation = DEMO_STATIONS[0];
  const nowPlayingVideo = nowPlayingStation.videos[0];

  return (
    <main className="guide-page-new">
      <div className="guide-header-new">
        <div className="guide-logo-section">
          <img
            src="/logos/YoFi TV Icon.svg"
            alt="YoFi TV"
            className="guide-yofi-logo"
          />
          <h1>Guide</h1>
        </div>

        {/* Now Playing Picture-in-Picture */}
        <div className="now-playing-pip">
          <div className="pip-video">
            <div className="pip-placeholder">
              <img src={nowPlayingStation.logo} alt="Now Playing" />
            </div>
          </div>
          <div className="pip-info">
            <p className="pip-station">{nowPlayingStation.name}</p>
            <p className="pip-video-title">{nowPlayingVideo.title}</p>
          </div>
        </div>
      </div>

      {/* Guide Grid */}
      <div className="guide-grid-container-new">
        {/* Time Column */}
        <div className="guide-column-new time-column-new">
          <div className="guide-cell-new time-header">Time</div>
          {timeSlots.map((time, index) => (
            <div key={`time-${index}`} className="guide-cell-new time-cell-new">
              {time}
            </div>
          ))}
        </div>

        {/* Station Columns */}
        {DEMO_STATIONS.map((station, stationIndex) => (
          <div key={station.id} className="guide-column-new">
            {/* Station Header with Logo */}
            <div className="guide-cell-new station-header-new">
              <img
                src={station.logo}
                alt={station.name}
                className="station-logo-header"
              />
            </div>

            {/* Video Cells */}
            {timeSlots.map((time, slotIndex) => {
              const video = getVideoForSlot(stationIndex, slotIndex);

              return (
                <Link
                  key={`${station.id}-${slotIndex}`}
                  href={`/stations/${station.id}`}
                  className="guide-cell-link-new"
                >
                  <div className="guide-cell-new video-cell-new">
                    <p className="cell-video-title">{video.title}</p>
                  </div>
                </Link>
              );
            })}
          </div>
        ))}
      </div>

      {/* Legend */}
      <div className="guide-legend-new">
        <p>Click any time slot to view station details</p>
      </div>
    </main>
  );
}