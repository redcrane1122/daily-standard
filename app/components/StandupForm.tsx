'use client';

import { useState } from 'react';
import { StandupEntry } from '../types/standup';

interface StandupFormProps {
  onSubmit: (standup: Omit<StandupEntry, 'id' | 'createdAt' | 'updatedAt'>) => void;
}

export default function StandupForm({ onSubmit }: StandupFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    yesterday: '',
    today: '',
    blockers: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name.trim() || !formData.yesterday.trim() || !formData.today.trim()) {
      alert('Please fill in all required fields');
      return;
    }

    setIsSubmitting(true);

    const newStandup = {
      name: formData.name.trim(),
      date: new Date().toISOString().split('T')[0],
      yesterday: formData.yesterday.trim(),
      today: formData.today.trim(),
      blockers: formData.blockers.trim() || null
    };

    onSubmit(newStandup);
    
    // Reset form
    setFormData({
      name: '',
      yesterday: '',
      today: '',
      blockers: ''
    });
    
    setIsSubmitting(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold text-gray-900 mb-6">Submit Your Standup</h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Name Field */}
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
            Your Name *
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Enter your name"
            required
          />
        </div>

        {/* Yesterday's Work */}
        <div>
          <label htmlFor="yesterday" className="block text-sm font-medium text-gray-700 mb-2">
            What did you accomplish yesterday? *
          </label>
          <textarea
            id="yesterday"
            name="yesterday"
            value={formData.yesterday}
            onChange={handleInputChange}
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Describe what you completed yesterday..."
            required
          />
        </div>

        {/* Today's Work */}
        <div>
          <label htmlFor="today" className="block text-sm font-medium text-gray-700 mb-2">
            What are you working on today? *
          </label>
          <textarea
            id="today"
            name="today"
            value={formData.today}
            onChange={handleInputChange}
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Describe what you plan to work on today..."
            required
          />
        </div>

        {/* Blockers */}
        <div>
          <label htmlFor="blockers" className="block text-sm font-medium text-gray-700 mb-2">
            Any blockers or impediments?
          </label>
          <textarea
            id="blockers"
            name="blockers"
            value={formData.blockers}
            onChange={handleInputChange}
            rows={2}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Describe any issues preventing progress (optional)"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {isSubmitting ? 'Submitting...' : 'Submit Standup'}
        </button>
      </form>
    </div>
  );
}

