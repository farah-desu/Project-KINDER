import React from 'react';
import { useNavigate } from 'react-router-dom';
const plans = [
  {
    title: 'Monthly Payment',
    priceDisplay: '৳ 500/month',
    amount: 500,
    benefits: [
      'Access to all basic features',
      'Email support',
      'Cancel anytime',
    ],
  },
  {
    title: '6 Months Plan',
    priceDisplay: '৳ 2700 (৳ 450/month)',
    amount: 2700,
    benefits: [
      'Save ৳ 300 total',
      'Priority email support',
      'Exclusive webinars',
    ],
  },
  {
    title: '12 Months Plan',
    priceDisplay: '৳ 4800 (৳ 400/month)',
    amount: 4800,
    benefits: [
      'Save ৳ 1200 total',
      '24/7 Support',
      'Free bonus content',
    ],
  },
];


const Payment = () => { 
    const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-gray-100 p-8 flex justify-center items-center">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-6xl">
        {plans.map((plan, idx) => (
          <div key={idx} className="bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center w-full h-[75vh] justify-between">
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-2">{plan.title}</h2>
              <p className="text-pink-700 text-xl font-semibold mb-4">{plan.priceDisplay}</p>
              <ul className="text-gray-600 space-y-2 mb-6">
                {plan.benefits.map((benefit, i) => (
                  <li key={i}>✅ {benefit}</li>
                ))}
              </ul>
            </div>
            <button
  onClick={() =>
    navigate('/Dashboard/Payment/Paymentwithbkash', {
      state: {
        title: plan.title,
        amount: plan.amount,
      },
    })
  }
  className="bg-[#e2136e] text-white px-6 py-2 rounded-lg hover:bg-pink-700 transition"
>
  Pay with bKash
</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Payment; 