import React, { useState } from 'react';
import './App.css';

function App() {
  // Define screen states: 'loginAccount', 'loginPin', 'menu', 'balance', 'withdraw', 'deposit'
  const [screen, setScreen] = useState('loginAccount');
  const [accountNumber, setAccountNumber] = useState('');
  const [pin, setPin] = useState('');
  const [loginError, setLoginError] = useState('');
  const [balance, setBalance] = useState(null);
  const [depositAmount, setDepositAmount] = useState('');
  const [withdrawAmount, setWithdrawAmount] = useState('');

  // For transaction feedback messages
  const [actionMessage, setActionMessage] = useState('');
  const [actionMessageType, setActionMessageType] = useState(''); // 'success' or 'error'

  // const API_BASE_URL = 'http://localhost:5000/api';

  // First screen: Account number entry.
  // Now, we call /api/balance to verify the account exists.
  const handleAccountEntry = async () => {
    if (!accountNumber) {
      setLoginError('Please enter an account number.');
      return;
    }
    try {
      const res = await fetch(`api/balance/${accountNumber}`);
      if (res.ok) {
        // Account exists; proceed to the PIN screen.
        setLoginError('');
        setScreen('loginPin');
      } else {
        // Account doesn't exist; show error and remain on this screen.
        const data = await res.json();
        setLoginError(`Account not found: ${data.error}`);
      }
    } catch (error) {
      setLoginError(`Error: ${error.message}`);
    }
  };

  // Second screen: PIN verification via server-side /api/login
  const handlePinVerification = async () => {
    if (!pin) {
      setLoginError('Please enter your PIN.');
      return;
    }
    try {
      const res = await fetch(`api/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ accountNumber, pin }),
      });
      if (res.ok) {
        setLoginError('');
        setPin('');
        setScreen('menu');
      } else {
        const data = await res.json();
        setLoginError(`Error: ${data.error}`);
      }
    } catch (error) {
      setLoginError(`Error: ${error.message}`);
    }
  };

  const handleLogout = () => {
    setScreen('loginAccount');
    setAccountNumber('');
    setPin('');
    setBalance(null);
    setDepositAmount('');
    setWithdrawAmount('');
    setLoginError('');
    setActionMessage('');
    setActionMessageType('');
  };

  const fetchBalance = async () => {
    try {
      const res = await fetch(`api/balance/${accountNumber}`);
      if (res.ok) {
        const data = await res.json();
        setBalance(data.balance);
      } else {
        setBalance(null);
      }
    } catch (error) {
      setBalance(null);
    }
  };

  const handleWithdraw = async () => {
    const amount = parseFloat(withdrawAmount);
    if (isNaN(amount) || amount <= 0) {
      setActionMessage('Invalid withdrawal amount.');
      setActionMessageType('error');
      setTimeout(() => setActionMessage(''), 3000);
      return;
    }
    try {
      const res = await fetch(`api/withdraw`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ accountNumber, amount }),
      });
      if (res.ok) {
        setActionMessage('Withdraw successful!');
        setActionMessageType('success');
        setWithdrawAmount('');
        setTimeout(() => setActionMessage(''), 3000);
        setScreen('menu');
      } else {
        const data = await res.json();
        setActionMessage(`Error: ${data.error}`);
        setActionMessageType('error');
        setTimeout(() => setActionMessage(''), 3000);
      }
    } catch (error) {
      setActionMessage(`Error: ${error.message}`);
      setActionMessageType('error');
      setTimeout(() => setActionMessage(''), 3000);
    }
  };

  const handleDeposit = async () => {
    const amount = parseFloat(depositAmount);
    if (isNaN(amount) || amount <= 0) {
      setActionMessage('Invalid deposit amount.');
      setActionMessageType('error');
      setTimeout(() => setActionMessage(''), 3000);
      return;
    }
    try {
      const res = await fetch(`api/deposit`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ accountNumber, amount }),
      });
      if (res.ok) {
        setActionMessage('Deposit successful!');
        setActionMessageType('success');
        setDepositAmount('');
        setTimeout(() => setActionMessage(''), 3000);
        setScreen('menu');
      } else {
        const data = await res.json();
        setActionMessage(`Error: ${data.error}`);
        setActionMessageType('error');
        setTimeout(() => setActionMessage(''), 3000);
      }
    } catch (error) {
      setActionMessage(`Error: ${error.message}`);
      setActionMessageType('error');
      setTimeout(() => setActionMessage(''), 3000);
    }
  };

  // Render a fixed message container at the top of the screen overlay.
  // On login screens, we use loginError; on other screens, actionMessage.
  const renderMessage = () => {
    const msg = (screen === 'loginAccount' || screen === 'loginPin') ? loginError : actionMessage;
    const type = (screen === 'loginAccount' || screen === 'loginPin') ? 'error' : actionMessageType;
    return (
      <div className="message-container">
        {msg && (
          <div className={`alert ${type === 'error' ? 'alert-danger' : 'alert-success'}`}>
            {msg}
          </div>
        )}
      </div>
    );
  };

  let content;
  if (screen === 'loginAccount') {
    content = (
      <div>
        <p>Please enter your account number:</p>
        <input
          type="text"
          placeholder="Account Number"
          value={accountNumber}
          onChange={(e) => setAccountNumber(e.target.value)}
          style={{ width: '100%', marginBottom: '8px' }}
        />
        <button onClick={handleAccountEntry}>Next</button>
      </div>
    );
  } else if (screen === 'loginPin') {
    content = (
      <div>
        <p>Please enter your PIN:</p>
        <input
          type="password"
          placeholder="PIN"
          value={pin}
          onChange={(e) => setPin(e.target.value)}
          style={{ width: '100%', marginBottom: '8px' }}
        />
        <button onClick={handlePinVerification}>Verify</button>
        <button onClick={() => setScreen('loginAccount')} style={{ marginLeft: '10px' }}>
          Back
        </button>
      </div>
    );
  } else if (screen === 'menu') {
    content = (
      <div>
        <h3>Welcome, account {accountNumber}</h3>
        <button
          onClick={() => {
            setScreen('balance');
            fetchBalance();
          }}
        >
          Get Balance
        </button>
        <button onClick={() => setScreen('withdraw')}>Withdraw</button>
        <button onClick={() => setScreen('deposit')}>Deposit</button>
      </div>
    );
  } else if (screen === 'balance') {
    content = (
      <div>
        <h3>Balance</h3>
        {balance !== null ? (
          <p>Your balance is: {balance}</p>
        ) : (
          <p>Unable to fetch balance.</p>
        )}
        <button onClick={() => setScreen('menu')}>Back</button>
      </div>
    );
  } else if (screen === 'withdraw') {
    content = (
      <div>
        <h3>Withdraw</h3>
        <input
          type="number"
          placeholder="Amount"
          value={withdrawAmount}
          onChange={(e) => setWithdrawAmount(e.target.value)}
          style={{ display: 'block', marginBottom: '8px' }}
        />
        <button onClick={handleWithdraw}>Confirm</button>
        <button onClick={() => setScreen('menu')} style={{ marginLeft: '10px' }}>
          Back
        </button>
      </div>
    );
  } else if (screen === 'deposit') {
    content = (
      <div>
        <h3>Deposit</h3>
        <input
          type="number"
          placeholder="Amount"
          value={depositAmount}
          onChange={(e) => setDepositAmount(e.target.value)}
          style={{ display: 'block', marginBottom: '8px' }}
        />
        <button onClick={handleDeposit}>Confirm</button>
        <button onClick={() => setScreen('menu')} style={{ marginLeft: '10px' }}>
          Back
        </button>
      </div>
    );
  }

  return (
    <div className="atm-container">
      <div className="screen-container">
        {renderMessage()}
        {content}
      </div>
      {screen !== 'loginAccount' && screen !== 'loginPin' && (
        <button className="logout-button" onClick={handleLogout}>
          Logout
        </button>
      )}
    </div>
  );
}

export default App;
