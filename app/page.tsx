'use client';

import { useState, useEffect } from 'react';
import StandupForm from './components/StandupForm';
import StandupList from './components/StandupList';
import { StandupEntry } from './types/standup';

export default function Home() {
  const [standups, setStandups] = useState<StandupEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchStandups();
  }, []);

  const fetchStandups = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/standups');
      if (!response.ok) {
        throw new Error('Failed to fetch standups');
      }
      const data = await response.json();
      setStandups(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const addStandup = async (standupData: Omit<StandupEntry, 'id' | 'createdAt' | 'updatedAt'>) => {
    try {
      const response = await fetch('/api/standups', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(standupData),
      });

      if (!response.ok) {
        throw new Error('Failed to create standup');
      }

      const newStandup = await response.json();
      setStandups(prev => [newStandup, ...prev]);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create standup');
    }
  };

  const clearStandups = async () => {
    try {
      const response = await fetch('/api/standups/clear', {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to clear standups');
      }

      setStandups([]);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to clear standups');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading standups...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">Error</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={fetchStandups}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Daily Standup
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Track your team's daily progress. Report what you accomplished yesterday, 
            what you're working on today, and any blockers you're facing.
          </p>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          {/* Standup Form */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <StandupForm onSubmit={addStandup} />
          </div>

          {/* Quick Stats */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Today's Summary</h2>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                <span className="text-green-700 font-medium">Team Members</span>
                <span className="text-2xl font-bold text-green-600">
                  {new Set(standups.filter(s => 
                    new Date(s.date).toDateString() === new Date().toDateString()
                  ).map(s => s.name)).size}
                </span>
              </div>
              <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                <span className="text-blue-700 font-medium">Today's Updates</span>
                <span className="text-2xl font-bold text-blue-600">
                  {standups.filter(s => 
                    new Date(s.date).toDateString() === new Date().toDateString()
                  ).length}
                </span>
              </div>
              <div className="flex justify-between items-center p-3 bg-orange-50 rounded-lg">
                <span className="text-orange-700 font-medium">Active Blockers</span>
                <span className="text-2xl font-bold text-orange-600">
                  {standups.filter(s => 
                    new Date(s.date).toDateString() === new Date().toDateString() && 
                    s.blockers && s.blockers.trim() !== ''
                  ).length}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Standup List */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold text-gray-900">Recent Standups</h2>
            {standups.length > 0 && (
              <button
                onClick={clearStandups}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
              >
                Clear All
              </button>
            )}
          </div>
          <StandupList standups={standups} />
        </div>
      </div>
    </div>
  );
}
