// lib/CurrentlyPlayingContext.tsx

'use client';

import { createContext, useContext, useState } from 'react';

interface CurrentlyPlaying {
  stationId: string;
  videoIndex: number;
  stationName: string;
}

interface CurrentlyPlayingContextType {
  current: CurrentlyPlaying;
  setCurrent: (playing: CurrentlyPlaying) => void;
}

const CurrentlyPlayingContext = createContext<CurrentlyPlayingContextType | null>(
  null
);

export function CurrentlyPlayingProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [current, setCurrent] = useState<CurrentlyPlaying>({
    stationId: '1',
    videoIndex: 0,
    stationName: 'YoFi TV Sleep',
  });

  return (
    <CurrentlyPlayingContext.Provider value={{ current, setCurrent }}>
      {children}
    </CurrentlyPlayingContext.Provider>
  );
}

export function useCurrentlyPlaying() {
  const context = useContext(CurrentlyPlayingContext);
  if (!context) {
    throw new Error(
      'useCurrentlyPlaying must be used within CurrentlyPlayingProvider'
    );
  }
  return context;
}