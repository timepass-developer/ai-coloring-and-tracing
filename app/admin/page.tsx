// app/admin/page.tsx
"use client";

import { useEffect, useState } from "react";

interface Stats {
  totalUsers: number;
  totalSubscribers: number;
  activeUsers: number;
  premiumUsers: number;
  newUsersToday: number;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchStats = async () => {
  try {
    const res = await fetch("/admin/stats");
    console.log("Stats response:", res.status);
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      console.error("Stats API error:", err);
      throw new Error(`Failed to load stats: ${res.status}`);
    }
    const data = await res.json();
    setStats(data);
  } catch (err) {
    console.error("FetchStats error:", err);
  } finally {
    setLoading(false);
  }
};


  useEffect(() => {
    fetchStats();
    const interval = setInterval(fetchStats, 30000); // refresh every 30 seconds
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="p-8 text-gray-500 text-center">
        Loading dashboard statistics...
      </div>
    );
  }

  if (!stats) {
    return (
      <div className="p-8 text-red-500 text-center">
        Failed to load stats. Please try again later.
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Total Users" value={stats.totalUsers} />
        <StatCard title="Premium Users" value={stats.premiumUsers} />
        <StatCard title="New Users Today" value={stats.newUsersToday} />
        <StatCard title="Newsletter Subs" value={stats.totalSubscribers} />
        <StatCard title="Active Users (7d)" value={stats.activeUsers} />
      </div>

      <p className="text-xs text-muted-foreground text-center">
        Auto-refreshing every 30 seconds
      </p>
    </div>
  );
}

function StatCard({ title, value }: { title: string; value: number }) {
  return (
    <div className="p-5 bg-white rounded-lg border border-gray-200 shadow-sm dark:bg-gray-900 dark:border-gray-800">
      <h3 className="text-sm text-gray-500 font-medium dark:text-gray-400">
        {title}
      </h3>
      <p className="text-3xl font-bold text-gray-900 mt-2 dark:text-gray-100">
        {value.toLocaleString()}
      </p>
    </div>
  );
}
