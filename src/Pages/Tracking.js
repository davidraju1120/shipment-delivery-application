import React, { useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { database, db } from '../Firebase/FirebaseConfig';
import { useNavigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';

const Tracking = ({ isLoggedIn }) => {
  const [trackingId, setTrackingId] = useState('');
  const [shipment, setShipment] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [userId, setUserId] = useState(null);
  const navigate = useNavigate();

  React.useEffect(() => {
    if (!isLoggedIn) {
      navigate('/login');
      return;
    }
    // Get current user ID
    const unsubscribe = onAuthStateChanged(db, (user) => {
      if (user) {
        setUserId(user.uid);
      } else {
        setUserId(null);
      }
    });
    return () => unsubscribe();
  }, [isLoggedIn, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setShipment(null);
    setLoading(true);
    if (!userId) {
      setError('User not authenticated.');
      setLoading(false);
      return;
    }
    try {
      const docRef = doc(database, userId, trackingId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setShipment(docSnap.data());
        setError('');
      } else {
        setError('No shipment found for this Tracking ID.');
      }
      setLoading(false);
    } catch (err) {
      setError('Error fetching shipment details.');
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#0077be]">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md mt-10">
        <h2 className="text-3xl font-bold text-center text-[#0077be] mb-6">Track Your Shipment</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <label className="text-lg font-medium text-gray-700">Tracking ID</label>
          <input
            type="text"
            value={trackingId}
            onChange={(e) => setTrackingId(e.target.value)}
            placeholder="Enter your Tracking ID (Firestore Doc ID)"
            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0077be]"
            required
          />
          <button
            type="submit"
            className="bg-[#0077be] text-white py-2 rounded-md font-semibold hover:bg-blue-800 transition-all duration-200"
            disabled={loading}
          >
            {loading ? 'Searching...' : 'Track'}
          </button>
        </form>
        {error && <div className="mt-4 text-red-600 text-center">{error}</div>}
        {shipment && (
          <div className="mt-6 bg-gray-100 rounded-md p-4">
            <h3 className="text-xl font-semibold mb-2 text-[#0077be]">Shipment Details</h3>
            <div className="flex flex-col gap-2">
              <div><span className="font-medium">Sender Name:</span> {shipment.senderName}</div>
              <div><span className="font-medium">Receiver Name:</span> {shipment.receiverName}</div>
              <div><span className="font-medium">Package Weight:</span> {shipment.packageWeight}</div>
              <div><span className="font-medium">Delivery Address:</span> {shipment.deliveryAddress}</div>
              <div><span className="font-medium">Shipment Date:</span> {shipment.shipmentDate}</div>
              <div><span className="font-medium">Expected Delivery Date:</span> {shipment.DeliveryDate}</div>
              <div><span className="font-medium">Status:</span> {shipment.status}</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Tracking; 