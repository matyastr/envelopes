import React, { useState } from "react";
import "./EnvelopeListItem.css";

export interface IEnvelopeListItem {
  title: string;
}

interface IEnvelopeListItemProps {
  title: string;
  index: number;
  accountBalance: number;
  setAccountBalance: React.Dispatch<React.SetStateAction<number>>;
  addToBalance: (index: number) => void;
  deleteEnvelope: (index: number) => void;
}

const EnvelopeListItem: React.FC<IEnvelopeListItemProps> = ({
  title,
  index,
  accountBalance,
  setAccountBalance,
  addToBalance,
  deleteEnvelope,
}) => {
  const [envelopeBalance, setEnvelopeBalance] = useState<number>(0);
  const [transaction, setTransaction] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const subtractFromBalance = () => {
    if (
      transaction === "" ||
      isNaN(Number(transaction)) ||
      accountBalance - Number(transaction) < 0
    ) {
      setErrorMessage("Insufficient funds");
      return;
    }

    setAccountBalance((balance) => balance - Number(transaction));
  };

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

              subtractFromBalance();
              setEnvelopeBalance(
                (prevBalance) => prevBalance + parseFloat(transaction)
              );
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
                (prevBalance) => prevBalance - parseFloat(transaction)
              );
              setErrorMessage(null)
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
