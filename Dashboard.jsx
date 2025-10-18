import React, { useEffect, useState } from 'react';
import TankLevelCard from '../components/TankLevelCard';

export default function Dashboard() {
  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/dashboard/data');
        if (!res.ok) throw new Error('Failed to fetch dashboard data');

        const data = await res.json();
        setDashboard(data);
      } catch (err) {
        console.error('❌ Dashboard fetch error:', err);
        setError('Failed to load dashboard. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, []);

  if (loading) return <p className="p-6">Loading dashboard...</p>;
  if (error) return <p className="p-6 text-red-600">{error}</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Customer Dashboard</h1>
      {dashboard && (
        <>
          <TankLevelCard level={dashboard.tankLevel} />
          <p className="mt-2">Active Orders: {dashboard.activeOrders}</p>

          <h2 className="mt-4 font-semibold">Booking History</h2>
          <ul className="list-disc pl-5">
            {dashboard.bookingHistory.length > 0 ? (
              dashboard.bookingHistory.map((order) => (
                <li key={order.id}>
                  {order.date} — {order.status}
                </li>
              ))
            ) : (
              <li>No booking history found</li>
            )}
          </ul>
        </>
      )}
    </div>
  );
}
