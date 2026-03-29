"use client";
import React, { useState } from 'react';

export default function DailyJournal() {
  // State untuk berpindah menu (Harian vs Tumbuh Kembang)
  const [activeTab, setActiveTab] = useState('harian');

  // State untuk data Harian
  const [tasks, setTasks] = useState({
    makanMandiri: false,
    sikatGigi: false,
    bacaBuku: false,
    mainBalok: false,
  });

  // State untuk data Tumbuh Kembang
  const [growth, setGrowth] = useState({
    beratBadan: '',
    tinggiBadan: '',
    catatanBaru: ''
  });

  const [isSaved, setIsSaved] = useState(false);

  const handleCheck = (task) => {
    setTasks({ ...tasks, [task]: !tasks[task] });
  };

  const handleGrowthChange = (e) => {
    setGrowth({ ...growth, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000); 
  };

  return (
    <div className="max-w-md mx-auto bg-gray-50 min-h-screen pb-20">
      {/* Header Profile */}
      <div className="bg-teal-600 p-6 rounded-b-3xl shadow-md text-white mb-6">
        <div className="flex items-center space-x-4">
          <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center text-teal-600 font-extrabold text-2xl shadow-inner">
            A
          </div>
          <div>
            <h1 className="text-xl font-bold">Jurnal Anak</h1>
            <p className="text-teal-100 text-sm">Catatan Hebat Hari Ini</p>
          </div>
        </div>
      </div>

      {/* Tab Navigasi */}
      <div className="flex justify-center space-x-2 px-4 mb-6">
        <button 
          onClick={() => setActiveTab('harian')}
          className={`px-6 py-2 rounded-full font-semibold text-sm transition-all ${activeTab === 'harian' ? 'bg-teal-600 text-white shadow-md' : 'bg-gray-200 text-gray-500'}`}
        >
          Kegiatan Harian
        </button>
        <button 
          onClick={() => setActiveTab('tumbuhKembang')}
          className={`px-6 py-2 rounded-full font-semibold text-sm transition-all ${activeTab === 'tumbuhKembang' ? 'bg-teal-600 text-white shadow-md' : 'bg-gray-200 text-gray-500'}`}
        >
          Tumbuh Kembang
        </button>
      </div>

      {/* KONTEN: Kegiatan Harian */}
      {activeTab === 'harian' && (
        <div className="px-4 space-y-4">
          <h2 className="text-md font-bold text-gray-700 ml-1">Ceklis Rutinitas</h2>
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 space-y-4">
            {[
              { id: 'makanMandiri', label: 'Belajar Makan Sendiri' },
              { id: 'sikatGigi', label: 'Sikat Gigi Sebelum Tidur' },
              { id: 'bacaBuku', label: 'Membaca Buku Cerita' },
              { id: 'mainBalok', label: 'Bermain Susun Balok / Puzzle' }
            ].map((item) => (
              <label key={item.id} className="flex items-center space-x-4 cursor-pointer p-2 hover:bg-gray-50 rounded-lg transition">
                <div className="relative flex items-center">
                  <input type="checkbox" checked={tasks[item.id]} onChange={() => handleCheck(item.id)} 
                        className="w-6 h-6 text-teal-500 rounded-md border-gray-300 focus:ring-teal-400 transition-all" />
                </div>
                <span className={`text-md font-medium ${tasks[item.id] ? 'line-through text-gray-400' : 'text-gray-700'}`}>
                  {item.label}
                </span>
              </label>
            ))}
          </div>
        </div>
      )}

      {/* KONTEN: Tumbuh Kembang */}
      {activeTab === 'tumbuhKembang' && (
        <div className="px-4 space-y-4">
          <h2 className="text-md font-bold text-gray-700 ml-1">Fisik & Pencapaian</h2>
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 space-y-5">
            
            <div className="flex space-x-4">
              <div className="w-1/2">
                <label className="block text-xs font-bold text-gray-500 mb-1">Berat Badan (kg)</label>
                <input type="number" name="beratBadan" value={growth.beratBadan} onChange={handleGrowthChange}
                       className="w-full bg-gray-50 border border-gray-200 text-gray-800 rounded-xl p-3 focus:ring-2 focus:ring-teal-500 outline-none" placeholder="Misal: 11.5" />
              </div>
              <div className="w-1/2">
                <label className="block text-xs font-bold text-gray-500 mb-1">Tinggi Badan (cm)</label>
                <input type="number" name="tinggiBadan" value={growth.tinggiBadan} onChange={handleGrowthChange}
                       className="w-full bg-gray-50 border border-gray-200 text-gray-800 rounded-xl p-3 focus:ring-2 focus:ring-teal-500 outline-none" placeholder="Misal: 85" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-500 mb-1">Kemampuan Baru Hari Ini</label>
              <textarea name="catatanBaru" value={growth.catatanBaru} onChange={handleGrowthChange} rows="3"
                        className="w-full bg-gray-50 border border-gray-200 text-gray-800 rounded-xl p-3 focus:ring-2 focus:ring-teal-500 outline-none" 
                        placeholder="Misal: Sudah bisa mengucapkan kata 'Bunda' dengan jelas, atau bisa menendang bola..."></textarea>
            </div>
          </div>
        </div>
      )}

      {/* Tombol Simpan Mengambang (Floating Action Button) */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white/80 backdrop-blur-sm border-t border-gray-100 max-w-md mx-auto">
        <button onClick={handleSave} className="w-full bg-teal-600 text-white font-bold py-3.5 rounded-xl shadow-lg hover:bg-teal-700 transition transform hover:scale-[1.02] active:scale-95">
          Simpan Catatan Hari Ini
        </button>
        {isSaved && (
          <div className="absolute -top-12 left-4 right-4 p-2 bg-green-500 text-white text-sm font-bold rounded-lg text-center shadow-md animate-bounce">
            Tersimpan dengan sukses! ✨
          </div>
        )}
      </div>
    </div>
  );
}