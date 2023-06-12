import React from 'react';

export const InvalidPage = () => {
    console.log('here')
  return (
    <div className='d-flex flex-column align-items-center justify-content-center vh-100'>
      <h1>404 - Page Not Found</h1>
      <p>The page you are looking for does not exist.</p>
    </div>
  );
}