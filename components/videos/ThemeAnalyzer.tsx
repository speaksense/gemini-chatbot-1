'use client'

import { useActions, useUIState } from 'ai/rsc'
import { useEffect, useState } from 'react'

interface ChannelTheme {
  themeSummary: string;
}

export const ThemeAnalyzer = () => {
  const { submitUserMessage } = useActions();
  const [_, setMessages] = useUIState();
  const [theme, setTheme] = useState<ChannelTheme | null>(null);

  // Fetch theme summary dynamically
  const fetchTheme = async () => {
    try {
      const response = await submitUserMessage("What is the overall theme of my channel?");
      const fetchedTheme: ChannelTheme = response.data.theme; // Adjust based on actual response shape
      setTheme(fetchedTheme);
    } catch (error) {
      console.error('Error fetching theme:', error);
    }
  };

  useEffect(() => {
    fetchTheme();
  }, []);

  return (
    <div className="grid gap-2 rounded-2xl border border-zinc-200 bg-white p-2 sm:p-4">
      <div className="font-medium">Overall Theme of Your Channel</div>
      <div className="grid gap-3">
        {theme === null ? (
          <div>Loading theme analysis...</div>
        ) : (
          <div className="p-2">
            {theme.themeSummary}
          </div>
        )}
      </div>
    </div>
  );
};
