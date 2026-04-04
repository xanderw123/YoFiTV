// app/guide/page.tsx

'use client';

import { useState } from 'react';
import Link from 'next/link';
import { DEMO_STATIONS } from '@/lib/demo-data';

export default function GuidePage() {
  // Get current time and calculate time slots
  const now = new Date();
  const currentHour = now.getHours();
  const currentMinute = now.getMinutes();

  // Generate time slots starting from current time (30-min intervals)
  const generateTimeSlots = () => {
    const slots = [];
    let hour = currentHour;
    let minute = currentMinute >= 30 ? 30 : 0;

    for (let i = 0; i < 6; i++) {
      const time = new Date();
      time.setHours(hour, minute, 0);
      slots.push(time);

      minute += 30;
      if (minute >= 60) {
        minute = 0;
        hour += 1;
        if (hour >= 24) hour = 0;
      }
    }
    return slots;
  };

  const timeSlots = generateTimeSlots();

  // Format time display
  const formatTime = (date) => {
    return date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    });
  };

  // Format date display
  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'numeric',
      day: 'numeric',
    });
  };

  // Get video for station at time slot
  const getVideoForSlot = (stationIndex, slotIndex) => {
    const station = DEMO_STATIONS[stationIndex];
    const videoIndex = slotIndex % station.videos.length;
    return station.videos[videoIndex];
  };

  // Selected cell state
  const [selectedCell, setSelectedCell] = useState({
    stationIndex: 0,
    slotIndex: 0,
  });

  const selectedStation = DEMO_STATIONS[selectedCell.stationIndex];
  const selectedVideo = getVideoForSlot(
    selectedCell.stationIndex,
    selectedCell.slotIndex
  );
  const selectedTime = timeSlots[selectedCell.slotIndex];
  const nextTime = new Date(selectedTime.getTime() + 30 * 60000);

  // Currently playing (first station, first slot)
  const nowPlayingStation = DEMO_STATIONS[0];

  return (
    <main className="guide-final">
      {/* TOP SECTION - Green Background */}
      <div className="guide-top-final">
        <div className="guide-top-content">
          {/* Left Side: Logo + Info */}
          <div className="guide-left-side">
            {/* Station Logo */}
            <div className="guide-logo-box">
              <img src={selectedStation.logo} alt={selectedStation.name} />
            </div>

            {/* Station Name + Time */}
            <div className="guide-station-header">
              <h2>{selectedStation.name}</h2>
              <p className="guide-time-range">
                {formatTime(selectedTime)} - {formatTime(nextTime)}
              </p>
            </div>
          </div>

          {/* Center: Big Title + Description */}
          <div className="guide-center-content">
            <h1 className="guide-main-title">{selectedVideo.title}</h1>
            <p className="guide-station-desc">{selectedStation.about}</p>
          </div>

          {/* Right Side: Picture-in-Picture */}
          <div className="guide-right-side">
            <div className="guide-pip-box">
              <img src={nowPlayingStation.logo} alt="Now Playing" />
            </div>
            <p className="guide-pip-label">
              Picture-in-Picture<br/>(Currently Playing)
            </p>
          </div>
        </div>
      </div>

      {/* GUIDE GRID */}
      <div className="guide-grid-final-v2">
        {/* Header Row */}
        <div className="grid-header-row">
          <div className="grid-header-date">
            <span>{formatDate(now)}</span>
          </div>
          {timeSlots.map((time, index) => (
            <div key={`header-${index}`} className="grid-header-time">
              {formatTime(time)}
            </div>
          ))}
        </div>

        {/* Station Rows */}
        {DEMO_STATIONS.map((station, stationIndex) => (
          <div key={station.id} className="grid-station-row">
            {/* Station Logo */}
            <div className="grid-logo-cell">
              <img src={station.logo} alt={station.name} />
            </div>

            {/* Video Cells */}
            {timeSlots.map((time, slotIndex) => {
              const video = getVideoForSlot(stationIndex, slotIndex);
              const isSelected =
                selectedCell.stationIndex === stationIndex &&
                selectedCell.slotIndex === slotIndex;

              return (
                <button
                  key={`${station.id}-${slotIndex}`}
                  className={`grid-video-cell-v2 ${isSelected ? 'active' : ''}`}
                  onClick={() =>
                    setSelectedCell({ stationIndex, slotIndex })
                  }
                >
                  <Link
                    href={`/stations/${station.id}`}
                    className="grid-cell-link-v2"
                  >
                    {video.title}
                  </Link>
                </button>
              );
            })}
          </div>
        ))}
      </div>
    </main>
  );
}