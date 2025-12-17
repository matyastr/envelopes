// Please build an envelope budgeting app

// x I can view a list of envelopes
// x I can add income
// x I can move income to envelopes. It subtracts from income and adds to the envelope.
// x I can spend money out of envelopes. It subtracts the money spent from the envelope.
// x I can save and retrive the data from a database

import { useEffect, useState } from "react";
import type { IEnvelopeListItem } from "./components/EnvelopeListItem";
import "./App.css";
import EnvelopeListItem from "./components/EnvelopeListItem";

function App() {
  const [accountBalance, setAccountBalance] = useState(100);
  const [envelopes, setEnvelopes] = useState<IEnvelopeListItem[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [newEnvelopeTitle, setNewEnvelopeTitle] = useState<string>("");
  const [newFundsAmount, setNewFundsAmount] = useState<string>("");

  useEffect(() => {
    const mainBalance = localStorage.getItem("main-balance");

    if (mainBalance) {
      const parsedValue = JSON.parse(mainBalance);

      if (typeof parsedValue === "number") {
        setAccountBalance(parsedValue);
      }
    }

    const envelopes = localStorage.getItem("envelopes");

    if (envelopes) {
      const parsedValue = JSON.parse(envelopes);

      if (Array.isArray(parsedValue)) {
        setEnvelopes(parsedValue);
      }
    }
  }, []);

  const saveMainBalance = (newVal: number) => {
    localStorage.setItem("main-balance", JSON.stringify(newVal));
  };

  const addToBalance = (amount: number) => {
    setAccountBalance((prevBalance) => {
      const newVal = prevBalance + amount;
      saveMainBalance(newVal);

      return newVal;
    });
  };

  const updateAppEnvelopeBalance = (index: number, amount: number) => {
    setEnvelopes((prevEnvelopes) => {
      const tempEnvelopes = prevEnvelopes.map((envelope, i) =>
        i === index
          ? { ...envelope, balance: amount }
          : envelope
      );
      localStorage.setItem("envelopes", JSON.stringify(tempEnvelopes));

      return tempEnvelopes;
    });
  };

  const subtractFromAccountBalance = (amount: number) => {
    setAccountBalance((prevBalance) => {
      const newVal = prevBalance - amount;
      saveMainBalance(newVal);

      return newVal;
    });
  };

  const addEnvelope = (title: string) => {
    if (newEnvelopeTitle === "") {
      setErrorMessage("Please enter an envelope name.");
      return;
    }

    const newEnvelope: IEnvelopeListItem = {
      title: title,
      balance: 0,
    };
    setEnvelopes((prevEnvelopes) => [...prevEnvelopes, newEnvelope]);

    setErrorMessage(null);
  };

  const addAccountFunds = (amount: number) => {
    if (isNaN(amount) || amount <= 0) {
      setErrorMessage("Please enter a valid amount to add.");
      return;
    }

    setAccountBalance((prevBalance) => {
      const newVal = prevBalance + amount;
      saveMainBalance(newVal);

      return newVal;
    });

    setErrorMessage(null);
  };

  const deleteEnvelope = (index: number) => {
    setEnvelopes((prevEnvelopes) => {
      const temp = prevEnvelopes.filter((_, i) => i !== index);
      localStorage.setItem("envelopes", JSON.stringify(temp));

      return temp;
    });
  };

  const renderList = envelopes.map((envelope, index) => (
    <EnvelopeListItem
      key={index}
      title={envelope.title}
      index={index}
      balance={envelope.balance}
      accountBalance={accountBalance}
      setAccountBalance={setAccountBalance}
      addToBalance={addToBalance}
      updateEnvelopeBalance={updateAppEnvelopeBalance}
      subtractFromBalance={subtractFromAccountBalance}
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
            onClick={() => addAccountFunds(Number(newFundsAmount))}
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
