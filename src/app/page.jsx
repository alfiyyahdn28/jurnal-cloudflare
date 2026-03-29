"use client";
import React, { useState } from 'react';

export default function DailyJournal() {
  const [activeTab, setActiveTab] = useState('harian');

  // 1. DAFTAR KEGIATAN YANG BISA DITAMBAH/HAPUS
  const [taskList, setTaskList] = useState([
    'Belajar Makan Sendiri',
    'Menyusun Puzzle',
    'Membaca Buku Cerita',
    'Merapikan Mainan'
  ]);
  const [newTaskInput, setNewTaskInput] = useState('');

  // 2. STATUS KEGIATAN HARI INI
  const [completedToday, setCompletedToday] = useState([]);

  const [growth, setGrowth] = useState({ beratBadan: '', tinggiBadan: '', catatanBaru: '' });
  const [isSaved, setIsSaved] = useState(false);

  // Fungsi menambah kegiatan
  const handleAddTask = (e) => {
    e.preventDefault();
    if (newTaskInput.trim() !== '' && !taskList.includes(newTaskInput)) {
      setTaskList([...taskList, newTaskInput]);
      setNewTaskInput('');
    }
  };

  // Fungsi menghapus kegiatan
  const handleDeleteTask = (taskToDelete) => {
    setTaskList(taskList.filter(t => t !== taskToDelete));
    setCompletedToday(completedToday.filter(t => t !== taskToDelete));
  };

  // Fungsi mencentang kegiatan
  const handleToggleTask = (task) => {
    if (completedToday.includes(task)) {
      setCompletedToday(completedToday.filter(t => t !== task));
    } else {
      setCompletedToday([...completedToday, task]);
    }
  };

  const handleGrowthChange = (e) => {
    setGrowth({ ...growth, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000); 
  };

  // Fungsi bantuan untuk membuat baris tabel rekap (Senin - Sabtu pakai data simulasi, Minggu pakai data hari ini)
  const renderWeeklyRow = (task) => {
    // Simulasi data Senin sampai Sabtu
    const pastDays = [true, false, true, true, false, true]; 
    const isTodayDone = completedToday.includes(task); // Hari Minggu (Hari Ini)
    const fullWeek = [...pastDays, isTodayDone];

    return fullWeek.map((isDone, index) => (
      <td key={index} className="px-2 py-3 text-center border-b border-gray-100">
        {isDone ? (
          <span className="inline-flex w-6 h-6 items-center justify-center bg-teal-100 text-teal-600 rounded-full text-xs font-bold">✓</span>
        ) : (
          <span className="text-gray-300 font-bold">-</span>
        )}
      </td>
    ));
  };

  return (
    <div className="max-w-md mx-auto bg-gray-50 min-h-screen pb-24">
      {/* Header Profile */}
      <div className="bg-teal-600 p-6 rounded-b-3xl shadow-md text-white mb-6">
        <div className="flex items-center space-x-4">
          <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center text-teal-600 font-extrabold text-2xl shadow-inner">A</div>
          <div>
            <h1 className="text-xl font-bold">Jurnal Anak</h1>
            <p className="text-teal-100 text-sm">Usia: 1 Tahun 11 Bulan</p>
          </div>
        </div>
      </div>

      {/* Tab Navigasi (Sekarang ada 3) */}
      <div className="flex justify-center space-x-2 px-2 mb-6 overflow-x-auto">
        {['harian', 'tumbuhKembang', 'rekap'].map((tab) => (
          <button 
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-full font-semibold text-xs whitespace-nowrap transition-all ${activeTab === tab ? 'bg-teal-600 text-white shadow-md' : 'bg-gray-200 text-gray-500'}`}
          >
            {tab === 'harian' ? '📋 Harian' : tab === 'tumbuhKembang' ? '📈 Tumbuh Kembang' : '📊 Rekap Mingguan'}
          </button>
        ))}
      </div>

      {/* KONTEN: Kegiatan Harian */}
      {activeTab === 'harian' && (
        <div className="px-4 space-y-4">
          
          {/* Form Tambah Kegiatan Baru */}
          <form onSubmit={handleAddTask} className="flex space-x-2 mb-2">
            <input 
              type="text" 
              value={newTaskInput} 
              onChange={(e) => setNewTaskInput(e.target.value)}
              placeholder="Ketik kegiatan baru..." 
              className="flex-1 bg-white border border-gray-200 text-gray-800 rounded-xl p-3 text-sm focus:ring-2 focus:ring-teal-500 outline-none shadow-sm"
            />
            <button type="submit" className="bg-teal-600 text-white font-bold px-4 rounded-xl shadow-sm hover:bg-teal-700">
              +
            </button>
          </form>

          <h2 className="text-sm font-bold text-gray-500 uppercase tracking-wider ml-1">Daftar Kegiatan</h2>
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 space-y-2">
            {taskList.length === 0 ? (
              <p className="text-center text-gray-400 text-sm py-4">Belum ada kegiatan. Silakan tambah di atas.</p>
            ) : (
              taskList.map((task) => (
                <div key={task} className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-lg transition group">
                  <label className="flex items-center space-x-4 cursor-pointer flex-1">
                    <input 
                      type="checkbox" 
                      checked={completedToday.includes(task)} 
                      onChange={() => handleToggleTask(task)} 
                      className="w-6 h-6 text-teal-500 rounded-md border-gray-300 focus:ring-teal-400 transition-all" 
                    />
                    <span className={`text-sm font-medium ${completedToday.includes(task) ? 'line-through text-gray-400' : 'text-gray-700'}`}>
                      {task}
                    </span>
                  </label>
                  <button onClick={() => handleDeleteTask(task)} className="text-gray-300 hover:text-red-500 px-2 font-bold text-lg">
                    ×
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* KONTEN: Rekap Mingguan (TAB BARU) */}
      {activeTab === 'rekap' && (
        <div className="px-4 space-y-4">
          <h2 className="text-md font-bold text-gray-700 ml-1">Catatan 7 Hari Terakhir</h2>
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="bg-teal-50 text-teal-700 text-xs uppercase font-bold">
                  <tr>
                    <th className="px-4 py-3 min-w-[140px]">Kegiatan</th>
                    {['Sn', 'Sl', 'Rb', 'Km', 'Jm', 'Sb', 'Mg'].map(hari => (
                      <th key={hari} className="px-2 py-3 text-center">{hari}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {taskList.length === 0 ? (
                    <tr><td colSpan="8" className="text-center py-6 text-gray-400">Belum ada data kegiatan.</td></tr>
                  ) : (
                    taskList.map((task) => (
                      <tr key={task} className="hover:bg-gray-50">
                        <td className="px-4 py-3 border-b border-gray-100 font-medium text-gray-700 text-xs">
                          {task}
                        </td>
                        {renderWeeklyRow(task)}
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
          <p className="text-xs text-gray-400 text-center mt-2">*Tabel ini bisa digeser ke kanan/kiri jika terpotong</p>
        </div>
      )}

      {/* KONTEN: Tumbuh Kembang (Tetap Sama) */}
      {activeTab === 'tumbuhKembang' && (
        <div className="px-4 space-y-4">
          <h2 className="text-md font-bold text-gray-700 ml-1">Fisik & Pencapaian</h2>
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 space-y-5">
            <div className="flex space-x-4">
              <div className="w-1/2">
                <label className="block text-xs font-bold text-gray-500 mb-1">Berat Badan (kg)</label>
                <input type="number" name="beratBadan" value={growth.beratBadan} onChange={handleGrowthChange}
                       className="w-full bg-gray-50 border border-gray-200 text-gray-800 rounded-xl p-3 focus:ring-2 focus:ring-teal-500 outline-none" placeholder="11.5" />
              </div>
              <div className="w-1/2">
                <label className="block text-xs font-bold text-gray-500 mb-1">Tinggi Badan (cm)</label>
                <input type="number" name="tinggiBadan" value={growth.tinggiBadan} onChange={handleGrowthChange}
                       className="w-full bg-gray-50 border border-gray-200 text-gray-800 rounded-xl p-3 focus:ring-2 focus:ring-teal-500 outline-none" placeholder="85" />
              </div>
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-500 mb-1">Kemampuan Baru Hari Ini</label>
              <textarea name="catatanBaru" value={growth.catatanBaru} onChange={handleGrowthChange} rows="3"
                        className="w-full bg-gray-50 border border-gray-200 text-gray-800 rounded-xl p-3 focus:ring-2 focus:ring-teal-500 outline-none" 
                        placeholder="Misal: Sudah bisa menyusun 4 balok ke atas..."></textarea>
            </div>
          </div>
        </div>
      )}

      {/* Tombol Simpan */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white/90 backdrop-blur-sm border-t border-gray-100 max-w-md mx-auto">
        <button onClick={handleSave} className="w-full bg-teal-600 text-white font-bold py-3.5 rounded-xl shadow-lg hover:bg-teal-700 transition transform hover:scale-[1.02] active:scale-95">
          Simpan Catatan Hari Ini
        </button>
        {isSaved && (
          <div className="absolute -top-12 left-4 right-4 p-2 bg-green-500 text-white text-sm font-bold rounded-lg text-center shadow-md animate-bounce">
            Data diamankan! ✨
          </div>
        )}
      </div>
    </div>
  );
}