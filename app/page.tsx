"use client";

import { useState, useEffect } from "react";
import StandupForm from "./components/StandupForm";
import StandupList from "./components/StandupList";
import { StandupEntry } from "./types/standup";

export default function Home() {
  const [standups, setStandups] = useState<StandupEntry[]>([]);

  useEffect(() => {
    // Load standups from localStorage on component mount
    const savedStandups = localStorage.getItem("daily-standups");
    if (savedStandups) {
      setStandups(JSON.parse(savedStandups));
    }
  }, []);

  const addStandup = (standup: StandupEntry) => {
    const newStandups = [standup, ...standups];
    setStandups(newStandups);
    localStorage.setItem("daily-standups", JSON.stringify(newStandups));
  };

  const clearStandups = () => {
    setStandups([]);
    localStorage.removeItem("daily-standups");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Daily Standup
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Track your team's daily progress. Report what you accomplished
            yesterday, what you're working on today, and any blockers you're
            facing.
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
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Today's Summary
            </h2>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                <span className="text-green-700 font-medium">Team Members</span>
                <span className="text-2xl font-bold text-green-600">
                  {
                    new Set(
                      standups
                        .filter(
                          (s) =>
                            new Date(s.date).toDateString() ===
                            new Date().toDateString()
                        )
                        .map((s) => s.name)
                    ).size
                  }
                </span>
              </div>
              <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                <span className="text-blue-700 font-medium">
                  Today's Updates
                </span>
                <span className="text-2xl font-bold text-blue-600">
                  {
                    standups.filter(
                      (s) =>
                        new Date(s.date).toDateString() ===
                        new Date().toDateString()
                    ).length
                  }
                </span>
              </div>
              <div className="flex justify-between items-center p-3 bg-orange-50 rounded-lg">
                <span className="text-orange-700 font-medium">
                  Active Blockers
                </span>
                <span className="text-2xl font-bold text-orange-600">
                  {
                    standups.filter(
                      (s) =>
                        new Date(s.date).toDateString() ===
                          new Date().toDateString() &&
                        s.blockers &&
                        s.blockers.trim() !== ""
                    ).length
                  }
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Standup List */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold text-gray-900">
              Recent Standups
            </h2>
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
