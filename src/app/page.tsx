'use client';

import React from 'react';

export default function Home() {
  const [buyIn, setBuyIn] = React.useState('');
  const [chipCount, setChipCount] = React.useState('');
  const [result, setResult] = React.useState<string | null>(null);
  const [error, setError] = React.useState('');

  const calculateCashout = React.useCallback(() => {
    setError('');
    
    // Validate inputs
    const buyInAmount = parseFloat(buyIn);
    const chips = parseFloat(chipCount);
    
    if (isNaN(buyInAmount) || buyInAmount <= 0) {
      setError('Please enter a valid buy-in amount');
      return;
    }
    
    if (isNaN(chips) || chips <= 0) {
      setError('Please enter a valid chip count');
      return;
    }

    // Calculate value per chip
    const valuePerChip = buyInAmount / 500;
    // Calculate cashout amount
    const cashout = (chips * valuePerChip).toFixed(2);
    setResult(cashout);
  }, [buyIn, chipCount]);

  const handleReset = () => {
    setBuyIn('');
    setChipCount('');
    setResult(null);
    setError('');
  };

  return (
    <main className="min-h-screen p-4 flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-center text-gray-900">Chip Calculator</h1>
        </div>
        
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Enter buy-in for 500 chips ($)
            </label>
            <input
              type="number"
              value={buyIn}
              onChange={(e) => setBuyIn(e.target.value)}
              placeholder="5.00"
              min="0"
              step="0.01"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-black"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Enter how many chips you have
            </label>
            <input
              type="number"
              value={chipCount}
              onChange={(e) => setChipCount(e.target.value)}
              placeholder="1345"
              min="0"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-black"
            />
          </div>

          <div className="flex space-x-2 pt-2">
            <button 
              onClick={calculateCashout}
              className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Calculate
            </button>
            <button 
              onClick={handleReset}
              className="flex-1 bg-white text-gray-700 px-4 py-2 rounded-md border border-gray-300 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Reset
            </button>
          </div>

          {error && (
            <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-md">
              <p className="text-sm text-red-600">{error}</p>
            </div>
          )}

          {result && (
            <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-md">
              <p className="text-center font-semibold text-green-700">
                Your cash-out amount is: ${result}
              </p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}