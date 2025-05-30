
import React from 'react';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, LineChart, Line } from 'recharts';

interface CompletedTask {
  id: string;
  title: string;
  completedAt: string;
  mood: string;
  date: string;
}

interface JournalEntry {
  id: string;
  text: string;
  mood: string;
  date: string;
  timestamp: string;
}

interface InsightsProps {
  onBack: () => void;
  completedTasks: CompletedTask[];
  journalEntries: JournalEntry[];
  mood: string;
}

const Insights = ({ onBack, completedTasks, journalEntries, mood }: InsightsProps) => {
  // Process data for charts
  const tasksByDate = completedTasks.reduce((acc, task) => {
    const date = task.date;
    acc[date] = (acc[date] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const chartData = Object.entries(tasksByDate).map(([date, count]) => ({
    date: date.split(' ').slice(1, 3).join(' '),
    tasks: count
  }));

  const moodData = journalEntries.map((entry, index) => ({
    day: `Day ${index + 1}`,
    mood: entry.mood === '😄' ? 5 : entry.mood === '😊' ? 4 : entry.mood === '😐' ? 3 : entry.mood === '😟' ? 2 : 1
  }));

  const chartConfig = {
    tasks: {
      label: "Tasks Completed",
      color: "#3b82f6",
    },
    mood: {
      label: "Mood Level",
      color: "#10b981",
    }
  };

  return (
    <div className="h-full bg-gradient-to-br from-purple-50 to-indigo-50 overflow-y-auto">
      {/* Header */}
      <div className="pt-12 pb-6 px-6">
        <div className="flex items-center mb-6">
          <button onClick={onBack} className="mr-4 text-2xl">←</button>
          <div>
            <h1 className="text-2xl font-bold text-gray-800">📊 Insights</h1>
            <p className="text-gray-600">Track your progress</p>
          </div>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="px-6 mb-6">
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white rounded-2xl p-4 shadow-lg border border-gray-100">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{completedTasks.length}</div>
              <div className="text-sm text-gray-600">Tasks Completed</div>
            </div>
          </div>
          <div className="bg-white rounded-2xl p-4 shadow-lg border border-gray-100">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{journalEntries.length}</div>
              <div className="text-sm text-gray-600">Journal Entries</div>
            </div>
          </div>
        </div>
      </div>

      {/* Task Completion Chart */}
      {chartData.length > 0 && (
        <div className="px-6 mb-6">
          <div className="bg-white rounded-2xl p-4 shadow-lg border border-gray-100">
            <h3 className="text-lg font-bold text-gray-800 mb-4">Daily Task Completion</h3>
            <ChartContainer config={chartConfig} className="h-48 w-full">
              <BarChart data={chartData} margin={{ top: 10, right: 20, left: 10, bottom: 10 }}>
                <XAxis dataKey="date" />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="tasks" fill="var(--color-tasks)" radius={4} />
              </BarChart>
            </ChartContainer>
          </div>
        </div>
      )}

      {/* Mood Tracking Chart */}
      {moodData.length > 0 && (
        <div className="px-6 mb-6">
          <div className="bg-white rounded-2xl p-4 shadow-lg border border-gray-100">
            <h3 className="text-lg font-bold text-gray-800 mb-4">Mood Tracking</h3>
            <ChartContainer config={chartConfig} className="h-48 w-full">
              <LineChart data={moodData} margin={{ top: 10, right: 20, left: 10, bottom: 10 }}>
                <XAxis dataKey="day" />
                <YAxis domain={[1, 5]} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Line 
                  type="monotone" 
                  dataKey="mood" 
                  stroke="var(--color-mood)" 
                  strokeWidth={3}
                  dot={{ fill: "var(--color-mood)", strokeWidth: 2, r: 4 }}
                />
              </LineChart>
            </ChartContainer>
          </div>
        </div>
      )}

      {/* Recent Journal Entries */}
      <div className="px-6 mb-32">
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
          <h3 className="text-lg font-bold text-gray-800 mb-4">Recent Journal Entries</h3>
          {journalEntries.length > 0 ? (
            <div className="space-y-4">
              {journalEntries.slice(-3).reverse().map((entry) => (
                <div key={entry.id} className="border-l-4 border-blue-500 pl-4 py-2">
                  <div className="flex items-center space-x-2 mb-1">
                    <span className="text-lg">{entry.mood}</span>
                    <span className="text-sm text-gray-500">{entry.date}</span>
                  </div>
                  <p className="text-gray-700 text-sm">{entry.text}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-center">No journal entries yet</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Insights;
