'use client'

import { useActions, useUIState } from 'ai/rsc'
import { useEffect, useState } from 'react'

interface SEOKeyword {
  keyword: string;
}

export const SEOOptimizer = () => {
  const { submitUserMessage } = useActions();
  const [_, setMessages] = useUIState();
  const [keywords, setKeywords] = useState<SEOKeyword[]>([]);

  // Fetch keyword suggestions dynamically
  const fetchKeywords = async () => {
    try {
      const response = await submitUserMessage("What words should I use to help people find my videos?");
      const fetchedKeywords: SEOKeyword[] = response.data.keywords; // Adjust based on actual response shape
      setKeywords(fetchedKeywords);
    } catch (error) {
      console.error('Error fetching keywords:', error);
    }
  };

  useEffect(() => {
    fetchKeywords();
  }, []);

  return (
    <div className="grid gap-2 rounded-2xl border border-zinc-200 bg-white p-2 sm:p-4">
      <div className="font-medium">SEO Keywords to Help People Find Your Videos</div>
      <div className="grid gap-3">
        {keywords.length === 0 ? (
          <div>Loading keywords...</div>
        ) : (
          keywords.map((keyword, index) => (
            <div key={index} className="flex items-center gap-2 p-2 hover:bg-zinc-50">
              <div>{keyword.keyword}</div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
