'use client'

import { useActions, useUIState } from 'ai/rsc'
import { useEffect, useState } from 'react'

interface Topic {
  topic: string;
}

export const TopicGenerator = () => {
  const { submitUserMessage } = useActions();
  const [_, setMessages] = useUIState();
  const [topics, setTopics] = useState<Topic[]>([]);

  // Fetch topic suggestions dynamically
  const fetchTopics = async () => {
    try {
      const response = await submitUserMessage("What topics should I focus on to increase my viewership?");
      const fetchedTopics: Topic[] = response.data.topics; // Adjust based on actual response shape
      setTopics(fetchedTopics);
    } catch (error) {
      console.error('Error fetching topics:', error);
    }
  };

  useEffect(() => {
    fetchTopics();
  }, []);

  return (
    <div className="grid gap-2 rounded-2xl border border-zinc-200 bg-white p-2 sm:p-4">
      <div className="font-medium">Recommended Topics to Increase Your Viewership</div>
      <div className="grid gap-3">
        {topics.length === 0 ? (
          <div>Loading topics...</div>
        ) : (
          topics.map((topic, index) => (
            <div key={index} className="flex items-center gap-2 p-2 hover:bg-zinc-50">
              <div>{topic.topic}</div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
