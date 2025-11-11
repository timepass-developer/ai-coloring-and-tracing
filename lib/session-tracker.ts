// lib/session-tracker.ts
// Client-side session tracking utility

const SESSION_STORAGE_KEY = 'kiwiz_session_start';
const UPDATE_INTERVAL = 5 * 60 * 1000; // Update every 5 minutes

export function startSessionTracking() {
  if (typeof window === 'undefined') return;

  // Set session start time if not already set
  if (!sessionStorage.getItem(SESSION_STORAGE_KEY)) {
    sessionStorage.setItem(SESSION_STORAGE_KEY, Date.now().toString());
  }

  // Update session time periodically
  const interval = setInterval(() => {
    updateSessionTime();
  }, UPDATE_INTERVAL);

  // Update on page unload
  window.addEventListener('beforeunload', updateSessionTime);

  // Cleanup
  return () => {
    clearInterval(interval);
    window.removeEventListener('beforeunload', updateSessionTime);
  };
}

function updateSessionTime() {
  const startTime = sessionStorage.getItem(SESSION_STORAGE_KEY);
  if (!startTime) return;

  const sessionDuration = (Date.now() - parseInt(startTime)) / 1000 / 60 / 60; // Convert to hours
  
  // Send to API to update database
  fetch('/api/analytics/track', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      type: 'SESSION',
      duration: sessionDuration,
    }),
  }).catch((error) => {
    console.error('Failed to track session:', error);
  });

  // Reset session start time
  sessionStorage.setItem(SESSION_STORAGE_KEY, Date.now().toString());
}

export function getSessionDuration(): number {
  if (typeof window === 'undefined') return 0;
  
  const startTime = sessionStorage.getItem(SESSION_STORAGE_KEY);
  if (!startTime) return 0;

  return (Date.now() - parseInt(startTime)) / 1000 / 60 / 60; // Return in hours
}

