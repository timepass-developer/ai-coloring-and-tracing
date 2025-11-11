"use client";

import { useState, useEffect } from "react";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";

interface UserActivity {
  action: string;
  content: string;
  timestamp: Date;
  userAgent: string;
  sessionId: string;
}

interface UserDataCollectionProps {
  onDataCollected?: (data: UserActivity) => void;
}

export function useUserDataCollection({ onDataCollected }: UserDataCollectionProps = {}) {
  const { user, isAuthenticated } = useKindeBrowserClient();
  const [sessionId] = useState(() => Math.random().toString(36).substring(2, 15));

  const trackActivity = (action: string, content: string) => {
    const activity: UserActivity = {
      action,
      content,
      timestamp: new Date(),
      userAgent: navigator.userAgent,
      sessionId,
    };

    // Store in localStorage for persistence
    const activities = JSON.parse(localStorage.getItem('userActivities') || '[]');
    activities.push(activity);
    localStorage.setItem('userActivities', JSON.stringify(activities));

    // Send to analytics if callback provided
    if (onDataCollected) {
      onDataCollected(activity);
    }

    // Send to server if user is authenticated
    if (isAuthenticated && user) {
      sendToServer(activity);
    }
  };

  const sendToServer = async (activity: UserActivity) => {
    try {
      await fetch('/api/analytics/track', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...activity,
          userId: user?.id,
          userEmail: user?.email,
          userName: `${user?.given_name} ${user?.family_name}`,
        }),
      });
    } catch (error) {
      console.error('Failed to send analytics data:', error);
    }
  };

  const getStoredActivities = (): UserActivity[] => {
    return JSON.parse(localStorage.getItem('userActivities') || '[]');
  };

  const clearStoredActivities = () => {
    localStorage.removeItem('userActivities');
  };

  return {
    trackActivity,
    getStoredActivities,
    clearStoredActivities,
    sessionId,
    isAuthenticated,
    user,
  };
}

// Analytics API endpoint
export async function POST(request: Request) {
  try {
    const data = await request.json();
    
    // Here you would typically send data to your analytics service
    // For example: Google Analytics, Mixpanel, or your own database
    
    console.log('Analytics data received:', data);
    
    // Example: Store in database or send to external service
    // await storeAnalyticsData(data);
    
    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Analytics error:', error);
    return new Response(JSON.stringify({ error: 'Failed to process analytics' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
