import React from 'react';

const Navigation = ({ onRoutChange, signedIn }) => {
  return signedIn ? (
    <nav style={{ display: 'flex', justifyContent: 'flex-end' }}>
      <p
        onClick={() => onRoutChange('signOut')}
        className="f3 link dim black underline pa3 pointer"
      >
        Sign Out
      </p>
    </nav>
  ) : (
    <nav style={{ display: 'flex', justifyContent: 'flex-end' }}>
      <p
        onClick={() => onRoutChange('signOut')}
        className="f3 link dim black underline pa3 pointer"
      >
        Sign In
      </p>
      <p
        onClick={() => onRoutChange('register')}
        className="f3 link dim black underline pa3 pointer"
      >
        Register
      </p>
    </nav>
  );
};
export default Navigation;
