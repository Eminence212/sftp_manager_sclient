import React from 'react';
import './loader.css';
const Loader = ({ displayed }) => {
  return (
    <div className={`loader-wrapper ${displayed ? 'loading' : 'loaded'}`}>
      <div className={'folding-cube'}>
        <div className={'cube1 cube'} />
        <div className={'cube2 cube'} />
        <div className={'cube4 cube'} />
        <div className={'cube3 cube'} />
      </div>
    </div>
  );
};

export default Loader;
