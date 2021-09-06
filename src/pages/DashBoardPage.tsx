import React, { useEffect } from 'react';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import Timeline from '../components/Timeline';

function DashBoardPage() {
  useEffect(() => {
    document.title = 'Ingstagram';
  }, []);

  return (
    <div className="bg-gray-50">
      <Header />
      <div className="grid justify-between max-w-screen-lg grid-cols-3 gap-4 mx-auto">
        <div className="col-span-3 mx-2 sm:col-span-2 sm:mx-1">
          <Timeline />
        </div>
        <div className="hidden sm:inline-grid sm:col-span-1">
          <Sidebar />
        </div>
      </div>
    </div>
  );
}

export default DashBoardPage;
