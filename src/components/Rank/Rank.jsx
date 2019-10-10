import React from 'react';

const Rank = ({ name, rank }) => {
  return (
    <div>
      <div className="f3 white">{`${name} your current rank is...`}</div>.{' '}
      <div className="f1 white">{rank}</div>
    </div>
  );
};
export default Rank;
