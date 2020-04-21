import React from 'react';
import './LoadingSpinner.css';

const LoadingSpinner = props => {
  return (
      <div style={{ textAlign: 'center' }} className={`${props.asOverlay && 'loading-spinner__overlay'}`}>
        <div className="lds-grid">
          <div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div>
        </div>
      </div>
  );
};

export default LoadingSpinner;