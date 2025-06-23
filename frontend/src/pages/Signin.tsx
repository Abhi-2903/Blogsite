import React from 'react';
import { Quote } from '../components/Quote';
import { Auth } from '../components/Auth';

export const Signin = () => {
  return (
    <div className="h-screen w-screen">
      <div className="grid grid-cols-1 md:grid-cols-2 h-full">
        
        {/* Left - Auth Form */}
        <div className="flex items-center justify-center p-4">
          <Auth type="signin" />
        </div>

        {/* Right - Quote (hidden on small screens) */}
        <div className="hidden md:flex items-center justify-center bg-gray-400 ">
          <Quote />
        </div>

      </div>
    </div>
  );
};
