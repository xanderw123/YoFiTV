// app/guide/page.tsx

'use client';

import { useState } from 'react';
import Link from 'next/link';
import { DEMO_STATIONS } from '@/lib/demo-data';
import { useCurrentlyPlaying } from '@/lib/CurrentlyPlayingContext';

export default function GuidePage() {
  const { current, setCurrent } = useCurrentlyPlaying();

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

  // Get YouTube ID from current playing video
  const getYouTubeId = (url) => {
    const regex =
      /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/;
    const match = url.match(regex);
    return match ? match[1] : '';
  };

  const currentPlayingStation = DEMO_STATIONS.find(
    (s) => s.id === current.stationId
  );
  const currentPlayingVideo = currentPlayingStation?.videos[current.videoIndex];
  const youtubeId = currentPlayingVideo
    ? getYouTubeId(currentPlayingVideo.url)
    : '';

  return (
    <main className="guide-page-final-v2">
      {/* TOP SECTION */}
      <div className="guide-top-section-v2">
        {/* Oversized Background Icon */}
        <div className="guide-bg-icon">
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11zm3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z"
              fill="#b3ff80"
            />
          </svg>
        </div>

        <div className="guide-top-content-v2">
          {/* Left: Logo + Station Info */}
          <div className="guide-top-left-v2">
            <div className="guide-logo-top-v2">
              <img src={selectedStation.logo} alt={selectedStation.name} />
            </div>
            <div className="guide-station-info-top-v2">
              <h2>{selectedStation.name}</h2>
              <p className="guide-time-slot-v2">
                {formatTime(selectedTime)} - {formatTime(nextTime)}
              </p>
            </div>
          </div>

          {/* Center: Big Title + Description */}
          <div className="guide-center-v2">
            <h1 className="guide-big-title-v2">{selectedVideo.title}</h1>
            <p className="guide-desc-v2">{selectedStation.about}</p>
          </div>

          {/* Right: Picture-in-Picture */}
          <div className="guide-pip-v2">
            <div className="pip-video-v2">
              {youtubeId ? (
                <iframe
                  src={`https://www.youtube.com/embed/${youtubeId}?autoplay=0&controls=0&modestbranding=1`}
                  title="Now Playing"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  style={{ width: '100%', height: '100%', border: 'none' }}
                ></iframe>
              ) : (
                <img src={currentPlayingStation?.logo} alt="Now Playing" />
              )}
            </div>
            <p className="pip-label-v2">
              Picture-in-Picture<br />(Currently Playing)
            </p>
          </div>
        </div>
      </div>

      {/* GUIDE GRID */}
      <div className="guide-grid-v2">
        {/* Header Row */}
        <div className="grid-header-v2">
          <div className="grid-date-cell-v2">{formatDate(now)}</div>
          {timeSlots.map((time, index) => (
            <div key={`time-${index}`} className="grid-time-cell-v2">
              {formatTime(time)}
            </div>
          ))}
        </div>

        {/* Station Rows */}
        {DEMO_STATIONS.map((station, stationIndex) => (
          <div key={station.id} className="grid-row-v2">
            {/* Logo Cell */}
            <div className="grid-logo-cell-v2">
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
                  className={`grid-cell-v2 ${isSelected ? 'active-v2' : ''}`}
                  onClick={() => {
                    setSelectedCell({ stationIndex, slotIndex });
                    setCurrent({
                      stationId: station.id,
                      videoIndex: slotIndex % station.videos.length,
                      stationName: station.name,
                    });
                  }}
                >
                  <Link
                    href={`/stations/${station.id}`}
                    className="grid-link-v2"
                    onClick={(e) => {
                      setCurrent({
                        stationId: station.id,
                        videoIndex: slotIndex % station.videos.length,
                        stationName: station.name,
                      });
                    }}
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