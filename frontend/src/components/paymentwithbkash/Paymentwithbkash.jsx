import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import bkash from '../../assets/bkash.webp'; // ensure path is correct
import axios from 'axios';
const Paymentwithbkash = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { title, amount } = location.state || {};
  const cleanamount = amount || 0;
  const [number, setNumber] = useState('');
  const [error, setError] = useState('');
  const [confirming, setConfirming] = useState(false);
  const name= localStorage.getItem('userName');
  const id= localStorage.getItem('userId');
  const handleConfirm = () => {
  if (!/^01\d{9}$/.test(number)) {
    setError('Please enter a valid bKash number');
    return;
  }

  setError('');
  setConfirming(true);

  // Simulate successful payment after 2s
  setTimeout(() => {
    axios.post('http://localhost:3001/api/payment', { name, id, amount: cleanamount })
      .then((response) => {
        console.log(response.data);
        alert(`Payment successful for ${title} (${amount})`);
        navigate('/Dashboard');
      })
      .catch((error) => {
        console.error('Error processing payment:', error);
        alert('Payment failed. Please try again.');
        setConfirming(false); // Allow retry
      });
  }, 2000); // <-- Don't forget to close the setTimeout properly
};


  return (
    <div className="min-h-screen bg-white flex justify-center items-center">
      <div className="w-[420px] bg-slate-300 rounded-lg overflow-hidden shadow-lg">
        <div className="bg-slate-300 flex flex-col items-center pt-6 pb-3 border-b border-gray-200">
          <img src={bkash} alt="bKash Logo" className="h-10 mb-2" />
          <div className="w-full px-6 py-3 bg-gray-50 text-sm text-gray-700 flex justify-between items-center">
            <div>
              <div className="font-medium">{title || 'Plan'}</div>
              <div className="text-xs text-gray-500 truncate w-60">
                Inv No: INV-{Date.now().toString().slice(-6)}
              </div>
            </div>
            <div className="text-xl font-bold text-pink-700">{amount || '৳ 0'}</div>
          </div>
        </div>

        <div className="bg-[#e2136e] text-white px-6 py-8 flex flex-col gap-4 items-center">
          <div className="text-center text-lg font-semibold">Your bKash Account Number</div>
          <input
            type="text"
            placeholder="e.g. 01XXXXXXXXX"
            value={number}
            onChange={(e) => setNumber(e.target.value)}
            className="w-full px-4 py-2 rounded-md text-gray-900 placeholder-gray-500"
          />
          {error && <div className="text-sm text-yellow-200">{error}</div>}
          <div className="text-sm text-white">
            Confirm and proceed, <a href="#" className="underline">terms & conditions</a>
          </div>
        </div>

        <div className="bg-white px-6 py-4 flex justify-between">
          <button
            className="w-1/2 py-2 border rounded-md font-medium"
            onClick={() => navigate('/Dashboard')}
          >
            Cancel
          </button>
          <button
            onClick={handleConfirm}
            className={`w-1/2 py-2 ml-2 ${
              confirming ? 'bg-gray-400 cursor-not-allowed' : 'bg-pink-700 hover:bg-pink-800'
            } text-white rounded-md font-medium`}
            disabled={confirming}
          >
            {confirming ? 'Processing...' : 'Confirm'}
          </button>
        </div>

        <div className="text-center text-red-600 text-xs pb-2">🔒 16247</div>
        <div className="text-center text-xs text-gray-400 pb-4">© 2025 bKash, All Rights Reserved</div>
      </div>
    </div>
  );
};


export default Paymentwithbkash;
