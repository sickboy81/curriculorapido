import { useState, useEffect } from 'react';

const BASE_COUNT = 5240; // Simulated starting number to show popularity
const STORAGE_KEY = 'resume_builder_count_local';

export const useResumeCounter = () => {
    const [count, setCount] = useState<number>(BASE_COUNT);

    useEffect(() => {
        // Load local increments from storage
        const loadCount = () => {
            try {
                const savedLocal = localStorage.getItem(STORAGE_KEY);
                const localCount = savedLocal ? parseInt(savedLocal, 10) : 0;

                // Add a small random variance to simulate "live" activity on first load per session
                // This makes it feel more dynamic without needing a backend
                // We only add this to the display state, not storage, to avoid runaway inflation
                const simulatedLiveActivity = Math.floor(Math.random() * 5);

                setCount(BASE_COUNT + localCount + simulatedLiveActivity);
            } catch (error) {
                console.error('Error loading counter:', error);
                setCount(BASE_COUNT);
            }
        };

        loadCount();
    }, []);

    const incrementCount = () => {
        try {
            setCount(prev => {
                const newCount = prev + 1;

                // Update local storage tracking
                const currentLocal = parseInt(localStorage.getItem(STORAGE_KEY) || '0', 10);
                localStorage.setItem(STORAGE_KEY, (currentLocal + 1).toString());

                return newCount;
            });
        } catch (error) {
            console.error('Error incrementing counter:', error);
        }
    };

    return { count, incrementCount };
};
