'use client';
import { useEffect, useState } from 'react';

const getRemainingTime = (endDate) => {
  if (!endDate) return null;
  const now = new Date();
  const hackweekEnd = new Date(endDate + 'T23:59:59');
  if (isNaN(hackweekEnd)) return null;
  const diff = Math.max(0, Math.floor((hackweekEnd - now) / 1000));
  const days = Math.floor(diff / (24 * 60 * 60));
  const hours = Math.floor((diff % (24 * 60 * 60)) / (60 * 60));
  const minutes = Math.floor((diff % (60 * 60)) / 60);
  const seconds = diff % 60;
  return { days, hours, minutes, seconds, isOver: diff === 0 };
};

export default function Countdown({ endDate }) {
  const [remaining, setRemaining] = useState(() => getRemainingTime(endDate));
  useEffect(() => {
    if (!endDate) return;
    const interval = setInterval(() => {
      setRemaining(getRemainingTime(endDate));
    }, 1000);
    return () => clearInterval(interval);
  }, [endDate]);

  if (!remaining) {
    return <div className="text-center text-red-500">Invalid or missing end date.</div>;
  }
  if (remaining.isOver) {
    return <div className="text-center text-3xl font-bold text-green-600">Hackweek is over 🎉</div>;
  }

  return (
    <div className="flex items-center justify-center space-x-4 p-6 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg shadow-lg">
      <div className="text-center">
        <div className="text-3xl font-bold text-white">{remaining.days}</div>
        <div className="text-sm text-blue-100">Days</div>
      </div>
      <div className="text-2xl font-bold text-white">:</div>
      <div className="text-center">
        <div className="text-3xl font-bold text-white">{remaining.hours.toString().padStart(2, '0')}</div>
        <div className="text-sm text-blue-100">Hours</div>
      </div>
      <div className="text-2xl font-bold text-white">:</div>
      <div className="text-center">
        <div className="text-3xl font-bold text-white">{remaining.minutes.toString().padStart(2, '0')}</div>
        <div className="text-sm text-blue-100">Minutes</div>
      </div>
      <div className="text-2xl font-bold text-white">:</div>
      <div className="text-center">
        <div className="text-3xl font-bold text-white">{remaining.seconds.toString().padStart(2, '0')}</div>
        <div className="text-sm text-blue-100">Seconds</div>
      </div>
    </div>
  );
}
