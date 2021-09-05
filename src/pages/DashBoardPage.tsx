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
        <Timeline />
        <Sidebar />
      </div>
    </div>
  );
}

export default DashBoardPage;
