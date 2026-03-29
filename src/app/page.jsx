"use client";
// @ts-nocheck

import React, { useState } from 'react';

export default function DailyJournal() {
  const [tasks, setTasks] = useState({
    tummyTime: false,
    murottal: false,
    sensoryPlay: false,
  });

  const [isSaved, setIsSaved] = useState(false);

  const handleCheck = (task) => {
    setTasks({ ...tasks, [task]: !tasks[task] });
  };

  const handleSave = () => {
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000); 
  };

  return (
    <div className="max-w-md mx-auto bg-gray-50 min-h-screen p-4">
      <div className="bg-white rounded-xl p-4 shadow-sm mb-6 flex items-center space-x-4">
        <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center text-teal-600 font-bold text-xl">A</div>
        <div>
          <h1 className="text-lg font-bold text-gray-800">Jurnal Aisha</h1>
          <p className="text-sm text-gray-500">Usia: 4 Bulan 12 Hari</p>
        </div>
      </div>

      <h2 className="text-md font-bold text-gray-700 mb-3">Stimulasi Hari Ini</h2>
      <div className="bg-white rounded-xl p-4 shadow-sm space-y-4 mb-6">
        <label className="flex items-center space-x-3 cursor-pointer">
          <input type="checkbox" checked={tasks.tummyTime} onChange={() => handleCheck('tummyTime')} 
                 className="w-5 h-5 text-teal-500 rounded focus:ring-teal-400" />
          <span className={`${tasks.tummyTime ? 'line-through text-gray-400' : 'text-gray-700'}`}>
            Tummy Time
          </span>
        </label>
        <label className="flex items-center space-x-3 cursor-pointer">
          <input type="checkbox" checked={tasks.murottal} onChange={() => handleCheck('murottal')} 
                 className="w-5 h-5 text-teal-500 rounded focus:ring-teal-400" />
          <span className={`${tasks.murottal ? 'line-through text-gray-400' : 'text-gray-700'}`}>
            Dengarkan Murottal
          </span>
        </label>
        <label className="flex items-center space-x-3 cursor-pointer">
          <input type="checkbox" checked={tasks.sensoryPlay} onChange={() => handleCheck('sensoryPlay')} 
                 className="w-5 h-5 text-teal-500 rounded focus:ring-teal-400" />
          <span className={`${tasks.sensoryPlay ? 'line-through text-gray-400' : 'text-gray-700'}`}>
            Sensory Play
          </span>
        </label>
      </div>

      <button onClick={handleSave} className="w-full bg-teal-600 text-white font-bold py-3 rounded-xl hover:bg-teal-700 transition">
        Simpan Jurnal Hari Ini
      </button>

      {isSaved && <div className="mt-4 p-3 bg-green-100 text-green-700 rounded-xl text-center font-bold">Alhamdulillah, tersimpan!</div>}
    </div>
  );
}