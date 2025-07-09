import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { getDocs, collection } from "firebase/firestore";
import { database, db } from "../Firebase/FirebaseConfig";
import { onAuthStateChanged } from "firebase/auth";

const sidebarLinks = [
  { name: 'Dashboard', path: '/dashboard', icon: '🏠' },
  { name: 'Shipments', path: '/dashboard', icon: '📦' },
  { name: 'Customers', path: '/customers', icon: '👥' },
  { name: 'Support', path: '/support', icon: '💬' },
  { name: 'Notifications', path: '/notifications', icon: '🔔' },
  { name: 'Settings', path: '/settings', icon: '⚙️' },
  { name: 'Logout', path: '/login', icon: '🚪' },
];

const dummyMapPins = [
  { x: 60, y: 80, name: 'Martin Schleifer', role: 'Delivery Agent' },
  { x: 120, y: 140, name: 'Brandon', role: 'Delivery Agent' },
  { x: 200, y: 60, name: 'Stanli', role: 'Delivery Agent' },
];

const Dashboard = ({ isLoggedIn }) => {
  const [userData, setUserData] = useState([]);
  const [activeTab, setActiveTab] = useState('Active');
  const location = useLocation();
  const userId = location.state;
  const navigate = useNavigate();

  useEffect(() => {
    onAuthStateChanged(db, (user) => {
      const getUserData = async () => {
        if (user) {
          const userId = user.uid;
          try {
            const collectionRef = collection(database, userId);
            const querySnapshot = await getDocs(collectionRef);
            const documents = [];
            querySnapshot.forEach((doc) => {
              documents.push({ ...doc.data(), id: doc.id });
            });
            setUserData(documents);
          } catch (error) {
            console.error("Error fetching data:", error);
          }
        } else {
          navigate("/");
        }
      };
      getUserData();
    });
  }, [navigate]);

  const filteredShipments = userData.filter(s =>
    activeTab === 'Active' ? s.status !== 'Delivered' : s.status === 'Delivered'
  );

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-[#0a2540] text-white flex flex-col py-8 px-4">
        <div className="text-2xl font-bold mb-8 flex items-center gap-2">
          <span className="bg-white text-[#0a2540] rounded-full w-8 h-8 flex items-center justify-center">S</span>
          <span>Shippo</span>
        </div>
        <nav className="flex-1">
          <ul className="space-y-2">
            {sidebarLinks.map(link => (
              <li key={link.name}>
                <button
                  className={`flex items-center gap-3 w-full px-3 py-2 rounded-lg hover:bg-[#1e3a5c] transition ${link.name === 'Shipments' ? 'bg-[#1e3a5c]' : ''}`}
                  onClick={() => link.path !== '#' && navigate(link.path)}
                >
                  <span>{link.icon}</span>
                  <span>{link.name}</span>
                </button>
              </li>
            ))}
          </ul>
        </nav>
        <div className="mt-8 text-xs text-gray-400">&copy; {new Date().getFullYear()} Shippo</div>
        <div className="mt-2 text-xs text-blue-300 italic">Developed by David Raju</div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-row">
        {/* Shipment List Panel */}
        <section className="w-[400px] bg-white p-6 border-r border-gray-200 flex flex-col">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-[#0a2540]">Shipment</h2>
            <button
              className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
              onClick={() => navigate("/add-new-shipment-form", { state: userId })}
            >
              + Add
            </button>
          </div>
          <div className="flex gap-2 mb-4">
            <button
              className={`flex-1 py-2 rounded-lg ${activeTab === 'Active' ? 'bg-[#0a2540] text-white' : 'bg-gray-200 text-[#0a2540]'}`}
              onClick={() => setActiveTab('Active')}
            >
              Active
            </button>
            <button
              className={`flex-1 py-2 rounded-lg ${activeTab === 'Completed' ? 'bg-[#0a2540] text-white' : 'bg-gray-200 text-[#0a2540]'}`}
              onClick={() => setActiveTab('Completed')}
            >
              Completed
            </button>
          </div>
          <div className="flex-1 overflow-y-auto">
            {filteredShipments.length === 0 ? (
              <div className="text-gray-400 text-center mt-10">No shipments found.</div>
            ) : (
              <ul className="space-y-4">
                {filteredShipments.map((shipment, idx) => (
                  <li key={shipment.id || idx} className="bg-gray-50 rounded-lg p-4 shadow flex flex-col gap-2">
                    <div className="flex justify-between items-center">
                      <span className="font-semibold text-[#0a2540]">{shipment.senderName} → {shipment.receiverName}</span>
                      <span className="text-xs text-gray-500">{shipment.id}</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-gray-600">{shipment.status}</span>
                      <span className="text-gray-500">{shipment.DeliveryDate}</span>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </section>

        {/* Map Panel (Dummy) */}
        <section className="flex-1 flex flex-col items-center justify-center bg-gray-200 relative">
          <div className="w-[90%] h-[80%] bg-white rounded-lg shadow-lg relative overflow-hidden">
            <div className="absolute inset-0 bg-blue-100">
              {/* Dummy map grid */}
              {[...Array(10)].map((_, i) => (
                <div key={i} className="absolute left-0 w-full border-t border-blue-200" style={{ top: `${i * 10}%` }} />
              ))}
              {[...Array(10)].map((_, i) => (
                <div key={i} className="absolute top-0 h-full border-l border-blue-200" style={{ left: `${i * 10}%` }} />
              ))}
              {/* Dummy pins */}
              {dummyMapPins.map((pin, idx) => (
                <div
                  key={idx}
                  className="absolute flex flex-col items-center"
                  style={{ left: `${pin.x}px`, top: `${pin.y}px` }}
                >
                  <div className="w-6 h-6 bg-green-600 rounded-full border-4 border-white shadow-lg flex items-center justify-center">
                    <span className="text-white font-bold">•</span>
                  </div>
                  <div className="bg-white rounded shadow px-2 py-1 mt-2 text-xs text-[#0a2540] font-semibold">
                    {pin.name}
                    <div className="text-gray-400 font-normal">{pin.role}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Dashboard;
