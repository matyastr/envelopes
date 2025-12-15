import React from 'react';

interface EnvelopeListItemProps {
  title: string;
  amount: number;
  onPress: () => void;
}

export interface IEnvelopeListItem { 
  title: string;
  amount: number;
}

const EnvelopeListItem: React.FC<EnvelopeListItemProps> = ({ title, amount, onPress }) => {
  return (
    <div className="container" onClick={onPress} >
      <div className="content">
        <div className="title">{title}</div>
        <div className="amount">${amount.toFixed(2)}</div>
      </div>
    </div>
  );
};

export default EnvelopeListItem;