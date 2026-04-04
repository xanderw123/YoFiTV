// app/guide/page.tsx

'use client';

import Link from 'next/link';
import { DEMO_STATIONS } from '@/lib/demo-data';

export default function GuidePage() {
  // Time slots for the guide (in 2-hour blocks)
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

  // For demo purposes, we'll rotate through stations for each time slot
  const getStationForSlot = (slotIndex: number) => {
    return DEMO_STATIONS[slotIndex % DEMO_STATIONS.length];
  };

  return (
    <main className="guide-page">
      <div className="guide-container">
        {/* Header */}
        <div className="guide-header">
          <h1>Station Guide</h1>
          <p className="guide-subtitle">
            24/7 rotations - Find what's playing now or browse upcoming
          </p>
        </div>

        {/* Guide Grid */}
        <div className="guide-wrapper">
          <div className="guide-grid">
            {/* Time Column (Left) */}
            <div className="guide-column guide-time-column">
              <div className="guide-cell guide-header-cell">Time</div>
              {timeSlots.map((time, index) => (
                <div key={`time-${index}`} className="guide-cell guide-time-cell">
                  {time}
                </div>
              ))}
            </div>

            {/* Station Columns */}
            {DEMO_STATIONS.map((station) => (
              <div key={station.id} className="guide-column">
                {/* Station Header */}
                <div className="guide-cell guide-header-cell guide-station-header">
                  <img
                    src={station.logo}
                    alt={station.name}
                    className="guide-station-logo"
                  />
                  <div className="guide-station-info">
                    <p className="guide-station-name">{station.name}</p>
                    <p className="guide-station-subtitle">{station.subtitle}</p>
                  </div>
                </div>

                {/* Video Slots */}
                {timeSlots.map((time, slotIndex) => {
                  const videoIndex = slotIndex % station.videos.length;
                  const video = station.videos[videoIndex];

                  return (
                    <Link
                      key={`${station.id}-${slotIndex}`}
                      href={`/stations/${station.id}`}
                      className="guide-cell-link"
                    >
                      <div className="guide-cell guide-station-cell">
                        <div className="guide-video-title">{video.title}</div>
                        <div className="guide-video-meta">{station.name}</div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            ))}
          </div>
        </div>

        {/* Info Text */}
        <div className="guide-info">
          <p>
            Click any time slot to see what's playing now or coming up next on
            that station.
          </p>
        </div>
      </div>
    </main>
  );
}