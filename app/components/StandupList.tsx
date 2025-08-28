"use client";

import { StandupEntry } from "../types/standup";

interface StandupListProps {
  standups: StandupEntry[];
}

export default function StandupList({ standups }: StandupListProps) {
  if (standups.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-400 text-6xl mb-4">📝</div>
        <h3 className="text-xl font-medium text-gray-600 mb-2">
          No standups yet
        </h3>
        <p className="text-gray-500">
          Be the first to submit your daily update!
        </p>
      </div>
    );
  }

  // Group standups by date
  const groupedStandups = standups.reduce((groups, standup) => {
    const date = standup.date;
    if (!groups[date]) {
      groups[date] = [];
    }
    groups[date].push(standup);
    return groups;
  }, {} as Record<string, StandupEntry[]>);

  // Sort dates in descending order
  const sortedDates = Object.keys(groupedStandups).sort(
    (a, b) => new Date(b).getTime() - new Date(a).getTime()
  );

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (date.toDateString() === today.toDateString()) {
      return "Today";
    } else if (date.toDateString() === yesterday.toDateString()) {
      return "Yesterday";
    } else {
      return date.toLocaleDateString("en-US", {
        weekday: "long",
        month: "short",
        day: "numeric",
      });
    }
  };

  const formatTime = (timestamp: number) => {
    return new Date(timestamp).toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="space-y-6">
      {sortedDates.map((date) => (
        <div
          key={date}
          className="border border-gray-200 rounded-lg overflow-hidden"
        >
          <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">
              {formatDate(date)}
            </h3>
            <p className="text-sm text-gray-600">
              {groupedStandups[date].length} update
              {groupedStandups[date].length !== 1 ? "s" : ""}
            </p>
          </div>

          <div className="divide-y divide-gray-200">
            {groupedStandups[date].map((standup) => (
              <div
                key={standup.id}
                className="p-4 hover:bg-gray-50 transition-colors"
              >
                <div className="flex justify-between items-start mb-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="text-blue-600 font-semibold text-sm">
                        {standup.name.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">
                        {standup.name}
                      </h4>
                      <p className="text-sm text-gray-500">
                        Submitted at {formatTime(standup.timestamp)}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  {/* Yesterday's Work */}
                  <div>
                    <h5 className="text-sm font-medium text-gray-700 mb-1 flex items-center">
                      <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                      Yesterday's Accomplishments
                    </h5>
                    <p className="text-gray-800 text-sm leading-relaxed">
                      {standup.yesterday}
                    </p>
                  </div>

                  {/* Today's Work */}
                  <div>
                    <h5 className="text-sm font-medium text-gray-700 mb-1 flex items-center">
                      <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                      Today's Focus
                    </h5>
                    <p className="text-gray-800 text-sm leading-relaxed">
                      {standup.today}
                    </p>
                  </div>

                  {/* Blockers */}
                  {standup.blockers && (
                    <div>
                      <h5 className="text-sm font-medium text-gray-700 mb-1 flex items-center">
                        <span className="w-2 h-2 bg-orange-500 rounded-full mr-2"></span>
                        Blockers
                      </h5>
                      <p className="text-gray-800 text-sm leading-relaxed">
                        {standup.blockers}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
