import React, { useState } from "react";
import "./EnvelopeListItem.css";

export interface IEnvelopeListItem {
  title: string;
  balance: number;
}

interface IEnvelopeListItemProps {
  title: string;
  balance: number;
  index: number;
  accountBalance: number;
  setAccountBalance: React.Dispatch<React.SetStateAction<number>>;
  addToBalance: (index: number) => void;
  subtractFromBalance: (index: number) => void;
  updateEnvelopeBalance: (index: number, amount: number) => void;
  deleteEnvelope: (index: number) => void;
}

const EnvelopeListItem: React.FC<IEnvelopeListItemProps> = ({
  title,
  index,
  balance,
  accountBalance,
  addToBalance,
  subtractFromBalance,
  updateEnvelopeBalance,
  deleteEnvelope,
}) => {
  const [envelopeBalance, setEnvelopeBalance] = useState<number>(balance);
  const [transaction, setTransaction] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  return (
    <div className="envelope" key={index}>
      <div>
        <h3>{title}</h3>
        <p>${envelopeBalance}</p>
      </div>
      <div>
        <input
          type="text"
          className="input"
          placeholder="Enter amount"
          onChange={(e) => setTransaction(e.target.value)}
        />
        {errorMessage && <p className="error">{errorMessage}</p>}
        <div className="inner-card">
          <button
            className="add-sub-button"
            onClick={() => {
              if (
                transaction === "" ||
                isNaN(Number(transaction)) ||
                accountBalance - Number(transaction) < 0
              ) {
                setErrorMessage("Please enter a valid amount.");
                return;
              }

              subtractFromBalance(Number(transaction));
              setEnvelopeBalance(
                (prevBalance) => prevBalance + Number(transaction)
              );
              updateEnvelopeBalance(index, envelopeBalance + Number(transaction));
              setErrorMessage(null);
            }}
          >
            Add Funds
          </button>
          <button
            className="add-sub-button"
            onClick={() => {
              if (
                transaction === "" ||
                isNaN(Number(transaction)) ||
                envelopeBalance - Number(transaction) < 0
              ) {
                setErrorMessage("Please enter a valid amount.");
                return;
              }

              setEnvelopeBalance(
                (prevBalance) => prevBalance - Number(transaction)
              );
              updateEnvelopeBalance(index, envelopeBalance - Number(transaction));
              setErrorMessage(null);
            }}
          >
            Subtract Funds
          </button>
        </div>
      </div>
      <button
        className="delete-button"
        onClick={() => {
          addToBalance(envelopeBalance);
          deleteEnvelope(index);
          setErrorMessage(null);
        }}
      >
        Delete Envelope
      </button>
    </div>
  );
};

export default EnvelopeListItem;