import { useState } from "react";
import type { IEnvelopeListItem } from "./components/EnvelopeListItem";
import "./App.css";

function App() {
  const [accountBalance, setAccountBalance] = useState(100);
  const [envelopes, setEnvelopes] = useState<IEnvelopeListItem[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [newEnvelopeTitle, setNewEnvelopeTitle] = useState<string>("");

  const subtractFromBalance = (amount: number) => {
    if (accountBalance - amount < 0) {
      setErrorMessage("Insufficient funds");
      return;
    }

    setAccountBalance((balance) => balance - amount);
  };

  const addToBalance = (amount: number) => {
    setAccountBalance((balance) => balance + amount);
  };

  const addEnvelope = (title: string, amount: number) => {
    if (amount > accountBalance) {
      setErrorMessage("Insufficient funds to create this envelope");
      return;
    }

    if (newEnvelopeTitle === "") {
      setErrorMessage("Please enter an envelope name.");
      return;
    }

    const newEnvelope: IEnvelopeListItem = { title, amount };
    setEnvelopes((prevEnvelopes) => [...prevEnvelopes, newEnvelope]);
    subtractFromBalance(amount);

    setErrorMessage(null);
  };

  const deleteEnvelope = (index: number) => {
    const envelopeToDelete = envelopes[index];
    addToBalance(envelopeToDelete.amount);

    setEnvelopes((prevEnvelopes) =>
      prevEnvelopes.filter((_, i) => i !== index)
    );
  };

  const renderList = envelopes.map((envelope, index) => (
    <div className="envelope" key={index}>
      <h3>{envelope.title}</h3>
      <p>${envelope.amount.toFixed(2)}</p>
      <button
        onClick={() => {
          deleteEnvelope(index);
        }}
      >
        Delete Envelope
      </button>
      <input
            type="text"
            className="input"
            placeholder="Enter amount"
            onChange={(e) => setNewEnvelopeTitle(e.target.value)}
          />
      <button
        onClick={() => {
          deleteEnvelope(index);
        }}
      >
        Add Funds
      </button>
      <button
        onClick={() => {
          deleteEnvelope(index);
        }}
      >
        Subtract Funds
      </button>
    </div>
  ));

  return (
    <>
      <h1>Envelopes Budgetting</h1>
      <div className="card">
        <h2>Main Account Balance</h2>
        <div className="balance">${accountBalance}</div>
        {errorMessage && <p className="error">{errorMessage}</p>}
        <div className="add-container">
          <button
            className="add-title"
            onClick={() => addEnvelope(newEnvelopeTitle, 0)}
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
