import React, { useEffect } from 'react';
import Header from '../components/Header';

function NotFoundPage() {
  useEffect(() => {
    document.title = 'Not Found - Ingstagram';
  }, []);

  return (
    <div className="bg-gray-50">
      <Header />
      <div className="max-w-screen-lg mx-auto">
        <p className="text-2xl text-center">Not Found!</p>
      </div>
    </div>
  );
}

export default NotFoundPage;
