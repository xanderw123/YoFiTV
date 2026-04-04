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

  // Currently playing (first station, first slot)
  const nowPlayingStation = DEMO_STATIONS[0];
  const nowPlayingVideo = getVideoForSlot(0, 0);

  return (
    <main className="guide-page-final">
      {/* Top Section - Selected Station Details */}
      <div className="guide-top-section">
        <div className="guide-top-left">
          {/* Station Logo */}
          <div className="guide-top-logo">
            <img src={selectedStation.logo} alt={selectedStation.name} />
          </div>

          {/* Station Info */}
          <div className="guide-top-info">
            <div className="guide-station-name-time">
              <h2>{selectedStation.name}</h2>
              <p className="guide-time-slot">
                {formatTime(selectedTime)} - {formatTime(new Date(selectedTime.getTime() + 30 * 60000))}
              </p>
            </div>

            {/* Big Video Title */}
            <h1 className="guide-big-title">{selectedVideo.title}</h1>

            {/* Description */}
            <p className="guide-description">
              {selectedStation.about}
            </p>
          </div>
        </div>

        {/* Right: Picture-in-Picture */}
        <div className="guide-pip">
          <div className="pip-container">
            <img src={nowPlayingStation.logo} alt="Now Playing" />
          </div>
          <p className="pip-label">Picture-in-Picture<br/>(Currently Playing)</p>
        </div>
      </div>

      {/* Guide Grid */}
      <div className="guide-grid-final">
        {/* Date/Time Header */}
        <div className="guide-grid-header">
          <div className="grid-header-left">
            <p className="grid-date">{formatDate(now)}</p>
          </div>
          <div className="grid-header-times">
            {timeSlots.map((time, index) => (
              <div key={`time-${index}`} className="grid-time-header">
                {formatTime(time)}
              </div>
            ))}
          </div>
        </div>

        {/* Stations and Videos */}
        <div className="guide-grid-rows">
          {DEMO_STATIONS.map((station, stationIndex) => (
            <div key={station.id} className="guide-grid-row">
              {/* Station Logo */}
              <div className="grid-station-logo">
                <img src={station.logo} alt={station.name} />
              </div>

              {/* Video Cells */}
              <div className="grid-videos">
                {timeSlots.map((time, slotIndex) => {
                  const video = getVideoForSlot(stationIndex, slotIndex);
                  const isSelected =
                    selectedCell.stationIndex === stationIndex &&
                    selectedCell.slotIndex === slotIndex;

                  return (
                    <button
                      key={`${station.id}-${slotIndex}`}
                      className={`grid-video-cell ${isSelected ? 'selected' : ''}`}
                      onClick={() =>
                        setSelectedCell({ stationIndex, slotIndex })
                      }
                    >
                      <Link
                        href={`/stations/${station.id}`}
                        className="grid-cell-link"
                      >
                        {video.title}
                      </Link>
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}