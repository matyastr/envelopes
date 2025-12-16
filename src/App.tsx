// Please build an envelope budgeting app

// x I can view a list of envelopes
// x I can add income
// x I can move income to envelopes. It subtracts from income and adds to the envelope.
// x I can spend money out of envelopes. It subtracts the money spent from the envelope.
// I can save and retrive the data from a database

// TODO: hook up add funds and substract funds
// connect to database
// clean up and push to Github

import { useState } from "react";
import type { IEnvelopeListItem } from "./components/EnvelopeListItem";
import "./App.css";
import EnvelopeListItem from "./components/EnvelopeListItem";

function App() {
  const [accountBalance, setAccountBalance] = useState(100);
  const [envelopes, setEnvelopes] = useState<IEnvelopeListItem[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [newEnvelopeTitle, setNewEnvelopeTitle] = useState<string>("");
  const [newFundsAmount, setNewFundsAmount] = useState<string>("");

  const addToBalance = (amount: number) => {
    setAccountBalance((balance) => balance + amount);
  };

  const addEnvelope = (title: string) => {
    if (newEnvelopeTitle === "") {
      setErrorMessage("Please enter an envelope name.");
      return;
    }

    const newEnvelope: IEnvelopeListItem = {
      title: title,
    };
    setEnvelopes((prevEnvelopes) => [...prevEnvelopes, newEnvelope]);

    setErrorMessage(null);
  };

  const addFunds = (amount: number) => {
    if (isNaN(amount) || amount <= 0) {
      setErrorMessage("Please enter a valid amount to add.");
      return;
    }

    setAccountBalance((balance) => balance + amount);
    setErrorMessage(null);
  };

  const deleteEnvelope = (index: number) => {
    setEnvelopes((prevEnvelopes) =>
      prevEnvelopes.filter((_, i) => i !== index)
    );
  };

  const renderList = envelopes.map((envelope, index) => (
    <EnvelopeListItem
      key={index}
      title={envelope.title}
      index={index}
      accountBalance={accountBalance}
      setAccountBalance={setAccountBalance}
      addToBalance={addToBalance}
      deleteEnvelope={deleteEnvelope}
    />
  ));

  return (
    <>
      <h1>Envelopes Budgetting</h1>
      <div>
        <h2>Main Account Balance</h2>
        <div className="balance">${accountBalance}</div>
        {errorMessage && <p className="error">{errorMessage}</p>}
        <div className="add-container">
          <button
            className="add-title"
            onClick={() => addFunds(Number(newFundsAmount))}
          >
            Add Funds
          </button>
          <input
            type="text"
            className="input"
            placeholder="Enter amount to add"
            onChange={(e) => setNewFundsAmount(e.target.value)}
          />
        </div>
        <div className="add-container">
          <button
            className="add-title"
            onClick={() => addEnvelope(newEnvelopeTitle)}
          >
            Add Envelope
          </button>
          <input
            type="text"
            className="input"
            placeholder="Enter new envelope name"
            onChange={(e) => setNewEnvelopeTitle(e.target.value)}
          />
        </div>

        <div className="envelope-list">{renderList}</div>
      </div>
    </>
  );
}

export default App;