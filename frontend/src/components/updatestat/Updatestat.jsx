import { useState } from 'react';
import axios from 'axios';
const Updatestat = () => {
 const [isActive, setIsActive] = useState(false);
  const sitterId = localStorage.getItem('userId');

  const toggleStatus = async () => {
    const newStatus = !isActive;
    setIsActive(newStatus);

    try {
      await axios.post('http://localhost:3001/api/set-status', {
        sitterId,
        active: newStatus,
      });
      console.log('Status updated:', newStatus);
    } catch (err) {
      console.error('Failed to update status:', err);
      alert("Failed to update active status.");
    }
  };

  return (
    <div className="h-screen w-screen flex items-center justify-center bg-gray-100">
      <button
        onClick={toggleStatus}
        className={`text-white text-2xl font-bold px-10 py-6 rounded-full transition-all duration-300 ${
          isActive ? 'bg-green-500 hover:bg-green-600' : 'bg-red-500 hover:bg-red-600'
        }`}
      >
        {isActive ? 'Active' : 'Inactive'}
      </button>
    </div>
  );
}

export default Updatestat
