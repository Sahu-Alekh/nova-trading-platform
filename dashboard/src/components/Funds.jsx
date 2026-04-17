import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import './FundsPage.css';

// --- Utility ---
const formatCurrency = (num) => new Intl.NumberFormat('en-IN', {
  minimumFractionDigits: 2, maximumFractionDigits: 2,
}).format(num || 0);

const formatCardNumber = (val) =>
  val.replace(/\D/g, '').slice(0, 16).replace(/(.{4})/g, '$1 ').trim();

const maskCardNumber = (num) => {
  const digits = num.replace(/\s/g, '');
  return '**** **** **** ' + digits.slice(-4);
};

// ─── Sub-components ───────────────────────────────────────────────────────────

/** Step 1: No account found → show account-details form */
const AccountDetailsForm = ({ username, onSave }) => {
  const [form, setForm] = useState({
    accountName: '',
    accountNumber: '',
    card: 'debit',
    username: username || '',
  });
  const [errors, setErrors] = useState({});

  const set = (key, val) => setForm(f => ({ ...f, [key]: val }));

  const validate = () => {
    const e = {};
    if (!form.accountName.trim()) e.accountName = 'Account name is required';
    if (!/^\d{16}$/.test(form.accountNumber.replace(/\s/g, '')))
      e.accountNumber = 'Enter a valid 16-digit card number';
    if (!form.username.trim()) e.username = 'Username is required';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) return;
    onSave({ ...form, accountNumber: form.accountNumber.replace(/\s/g, '') });
  };

  return (
    <div className="rzp-modal-overlay">
      <div className="rzp-modal">
        <div className="rzp-modal-header">
          <div className="rzp-logo">
            <span className="rzp-logo-icon">🏦</span>
            <span>Add Bank Account</span>
          </div>
          <p className="rzp-subtitle">Link your account to add funds</p>
        </div>

        <div className="rzp-modal-body">
          <div className="rzp-field">
            <label>Username</label>
            <input
              type="text"
              value={form.username}
              onChange={e => set('username', e.target.value)}
              placeholder="Your username"
            />
            {errors.username && <span className="rzp-error">{errors.username}</span>}
          </div>

          <div className="rzp-field">
            <label>Account Holder Name</label>
            <input
              type="text"
              value={form.accountName}
              onChange={e => set('accountName', e.target.value)}
              placeholder="Name as on card"
            />
            {errors.accountName && <span className="rzp-error">{errors.accountName}</span>}
          </div>

          <div className="rzp-field">
            <label>Card Number</label>
            <input
              type="text"
              value={formatCardNumber(form.accountNumber)}
              onChange={e => set('accountNumber', e.target.value.replace(/\s/g, ''))}
              placeholder="0000 0000 0000 0000"
              maxLength={19}
            />
            {errors.accountNumber && <span className="rzp-error">{errors.accountNumber}</span>}
          </div>

          <div className="rzp-field">
            <label>Card Type</label>
            <div className="rzp-card-type-group">
              {['debit', 'credit'].map(type => (
                <button
                  key={type}
                  className={`rzp-card-type-btn ${form.card === type ? 'active' : ''}`}
                  onClick={() => set('card', type)}
                  type="button"
                >
                  {type === 'debit' ? '💳 Debit Card' : '💰 Credit Card'}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="rzp-modal-footer">
          <button className="rzp-pay-btn" onClick={handleSubmit}>
            Save & Continue →
          </button>
        </div>
      </div>
    </div>
  );
};

/** Step 2: Account found → Razorpay-style payment modal */
const RazorpayModal = ({ accountDetails, amount, username, onSuccess, onClose, onAddNewCard }) => {
  const [cvv, setCvv] = useState('');
  const [expiry, setExpiry] = useState('');
  const [loading, setLoading] = useState(false);
  const [cvvError, setCvvError] = useState('');
  const [expiryError, setExpiryError] = useState('');
  const [useNewCard, setUseNewCard] = useState(false);
  const [newCard, setNewCard] = useState({
    accountName: '', accountNumber: '', card: 'debit',
  });

  const formatExpiry = val =>
    val.replace(/\D/g, '').slice(0, 4).replace(/(\d{2})(\d{1,2})/, '$1/$2');

  const validate = () => {
    let valid = true;
    if (!/^\d{3,4}$/.test(cvv)) { setCvvError('Enter valid CVV'); valid = false; }
    else setCvvError('');
    if (!/^\d{2}\/\d{2}$/.test(expiry)) { setExpiryError('Enter valid expiry MM/YY'); valid = false; }
    else setExpiryError('');
    return valid;
  };

  const handlePay = async () => {
    if (!validate()) return;
    setLoading(true);
    try {
      await axios.post('http://localhost:3003/addFunds', { username, amount: parseFloat(amount) });
      onSuccess();
    } catch (err) {
      alert(err.response?.data || 'Payment failed');
    } finally {
      setLoading(false);
    }
  };

  const card = useNewCard ? newCard : accountDetails;
  const maskedNum = card.accountNumber
    ? maskCardNumber(card.accountNumber.toString())
    : '**** **** **** ****';

  return (
    <div className="rzp-modal-overlay">
      <div className="rzp-modal rzp-payment-modal">
        {/* Left panel */}
        <div className="rzp-left-panel">
          <div className="rzp-brand">
            <div className="rzp-brand-icon">Z</div>
            <div>
              <div className="rzp-brand-name">Zerodha Pay</div>
              <div className="rzp-brand-sub">Secure Payment Gateway</div>
            </div>
          </div>
          <div className="rzp-amount-display">
            <span className="rzp-amount-label">Paying</span>
            <span className="rzp-amount-value">₹{formatCurrency(amount)}</span>
          </div>
          <div className="rzp-secure-badge">
            <span>🔒</span> 256-bit SSL Secured
          </div>
        </div>

        {/* Right panel */}
        <div className="rzp-right-panel">
          <div className="rzp-right-header">
            <h3>Pay with Card</h3>
            <button className="rzp-close-btn" onClick={onClose}>✕</button>
          </div>

          {/* Saved card row */}
          {!useNewCard ? (
            <div className="rzp-saved-card">
              <div className="rzp-saved-card-info">
                <div className="rzp-card-chip">💳</div>
                <div>
                  <div className="rzp-card-num">{maskedNum}</div>
                  <div className="rzp-card-holder">{accountDetails.accountName} · {accountDetails.card === 'credit' ? 'Credit' : 'Debit'}</div>
                </div>
              </div>
              <button className="rzp-link-btn" onClick={() => setUseNewCard(true)}>
                + Add new card
              </button>
            </div>
          ) : (
            <div className="rzp-new-card-form">
              <div className="rzp-field">
                <label>Cardholder Name</label>
                <input type="text" placeholder="Name on card" value={newCard.accountName}
                  onChange={e => setNewCard(n => ({ ...n, accountName: e.target.value }))} />
              </div>
              <div className="rzp-field">
                <label>Card Number</label>
                <input type="text" placeholder="0000 0000 0000 0000" maxLength={19}
                  value={formatCardNumber(newCard.accountNumber)}
                  onChange={e => setNewCard(n => ({ ...n, accountNumber: e.target.value.replace(/\s/g, '') }))} />
              </div>
              <div className="rzp-card-type-group" style={{ marginBottom: 12 }}>
                {['debit', 'credit'].map(t => (
                  <button key={t} type="button"
                    className={`rzp-card-type-btn ${newCard.card === t ? 'active' : ''}`}
                    onClick={() => setNewCard(n => ({ ...n, card: t }))}>
                    {t === 'debit' ? '💳 Debit' : '💰 Credit'}
                  </button>
                ))}
              </div>
              <button className="rzp-link-btn" onClick={() => setUseNewCard(false)}>
                ← Use saved card
              </button>
            </div>
          )}

          <div className="rzp-row-2">
            <div className="rzp-field">
              <label>Expiry (MM/YY)</label>
              <input type="text" placeholder="MM/YY" maxLength={5}
                value={expiry} onChange={e => setExpiry(formatExpiry(e.target.value))} />
              {expiryError && <span className="rzp-error">{expiryError}</span>}
            </div>
            <div className="rzp-field">
              <label>CVV</label>
              <input type="password" placeholder="•••" maxLength={4}
                value={cvv} onChange={e => setCvv(e.target.value.replace(/\D/g, '').slice(0, 4))} />
              {cvvError && <span className="rzp-error">{cvvError}</span>}
            </div>
          </div>

          <button className="rzp-pay-btn" onClick={handlePay} disabled={loading}>
            {loading ? (
              <span className="rzp-spinner">⏳ Processing...</span>
            ) : (
              `Pay ₹${formatCurrency(amount)}`
            )}
          </button>

          <p className="rzp-disclaimer">
            By paying, you agree to our <a href="#">Terms</a>. Your card details are encrypted and never stored.
          </p>
        </div>
      </div>
    </div>
  );
};

// ─── Main Component ────────────────────────────────────────────────────────────

const Funds = ({ username }) => {
  const [segment, setSegment] = useState('equity');
  const [fundData, setFundData] = useState({ availableMargin: 0, usedMargin: 0, availableCash: 0 });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [amountInput, setAmountInput] = useState('');
  const [modalMode, setModalMode] = useState('add');

  // Account details flow
  const [accountDetails, setAccountDetails] = useState(null); // null = not fetched yet
  const [flowStep, setFlowStep] = useState(null); // null | 'account-form' | 'amount-input' | 'razorpay'
  const [pendingAmount, setPendingAmount] = useState('');

  const fetchFunds = useCallback(async () => {
    try {
      const res = await axios.get(`http://localhost:3003/userFunds?username=${username}`);
      setFundData(res.data);
    } catch (err) { console.error('Error fetching funds:', err); }
  }, [username]);

  const fetchAccountDetails = useCallback(async () => {
    try {
      const res = await axios.get(`http://localhost:3003/accountDetails?username=${username}`);
      return res.data; // expects { accountName, accountNumber, card, username }
    } catch {
      return null;
    }
  }, [username]);

  useEffect(() => { if (username) fetchFunds(); }, [username, fetchFunds]);

  // ── Add Funds Flow ──
  const handleAddFundsClick = async () => {
    const details = await fetchAccountDetails();
    if (!details) {
      setFlowStep('account-form');
    } else {
      setAccountDetails(details);
      setFlowStep('amount-input');
    }
  };

  const handleAccountSave = async (details) => {
    try {
      console.log(details);
      await axios.post('http://localhost:3003/saveAccountDetails', details);
      setAccountDetails(details);
      setFlowStep('amount-input');
    } catch (err) {
      alert(err.response?.data || 'Failed to save account details');
    }
  };

  const handleAmountSubmit = () => {
    const amt = parseFloat(pendingAmount);
    if (isNaN(amt) || amt <= 0) return alert('Enter a valid amount');
    setFlowStep('razorpay');
  };

  const handlePaymentSuccess = () => {
    alert('Funds Added Successfully! 🎉');
    setFlowStep(null);
    setPendingAmount('');
    fetchFunds();
  };

  // ── Withdraw Flow (unchanged) ──
  const handleWithdraw = async () => {
    const amount = parseFloat(amountInput);
    if (isNaN(amount) || amount <= 0) return alert('Enter a valid amount');
    try {
      await axios.post('http://localhost:3003/withdrawFunds', { username, amount });
      alert('Funds Withdrawn Successfully!');
      setAmountInput('');
      setIsModalOpen(false);
      fetchFunds();
    } catch (err) {
      alert(err.response?.data || 'Transaction failed');
    }
  };

  return (
    <div className="funds-container">
      <header className="funds-header">
        <div className="tabs">
          <button className={segment === 'equity' ? 'active' : ''} onClick={() => setSegment('equity')}>Equity</button>
          <button className={segment === 'commodity' ? 'active' : ''} onClick={() => setSegment('commodity')}>Commodity</button>
        </div>
      </header>

      <div className="funds-content">
        <div className="funds-left">
          <div className="margin-summary">
            <div className="summary-card">
              <span className="label">Available margin</span>
              <h1 className="value green">{formatCurrency(fundData.availableMargin)}</h1>
            </div>
            <div className="summary-card">
              <span className="label">Used margin</span>
              <h1 className="value">{formatCurrency(fundData.usedMargin)}</h1>
            </div>
            <div className="summary-card">
              <span className="label">Available cash</span>
              <h1 className="value">{formatCurrency(fundData.availableCash)}</h1>
            </div>
          </div>
          <div className="action-buttons">
            <button className="btn btn-blue" onClick={handleAddFundsClick}>Add funds</button>
            <button className="btn btn-white" onClick={() => setIsModalOpen(true)}>Withdraw</button>
          </div>
        </div>

        <div className="funds-right">
          <div className="detail-row"><span>Opening balance</span><span className="detail-value">{formatCurrency(fundData.availableMargin + fundData.usedMargin)}</span></div>
          <div className="detail-row"><span>Payin</span><span className="detail-value">0.00</span></div>
          <div className="detail-row"><span>Payout</span><span className="detail-value">0.00</span></div>
          <div className="detail-row"><span>SPAN</span><span className="detail-value">0.00</span></div>
          <div className="detail-row"><span>Exposure</span><span className="detail-value">0.00</span></div>
          <div className="detail-row"><span>Option premium</span><span className="detail-value">0.00</span></div>
        </div>
      </div>

      {/* ── FLOW: No account → show form ── */}
      {flowStep === 'account-form' && (
        <AccountDetailsForm username={username} onSave={handleAccountSave} />
      )}

      {/* ── FLOW: Account found → enter amount ── */}
      {flowStep === 'amount-input' && (
        <div className="rzp-modal-overlay">
          <div className="rzp-modal rzp-amount-modal">
            <div className="rzp-modal-header">
              <div className="rzp-logo"><span>💰</span><span>Add Funds</span></div>
              <p className="rzp-subtitle">How much would you like to add?</p>
            </div>
            <div className="rzp-modal-body">
              <div className="rzp-field">
                <label>Amount (₹)</label>
                <input
                  type="number" autoFocus
                  placeholder="Enter amount"
                  value={pendingAmount}
                  onChange={e => setPendingAmount(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && handleAmountSubmit()}
                />
              </div>
              <div className="rzp-quick-amounts">
                {[1000, 5000, 10000, 25000].map(a => (
                  <button key={a} className="rzp-quick-btn" onClick={() => setPendingAmount(String(a))}>
                    ₹{a.toLocaleString('en-IN')}
                  </button>
                ))}
              </div>
            </div>
            <div className="rzp-modal-footer rzp-footer-row">
              <button className="rzp-cancel-btn" onClick={() => setFlowStep(null)}>Cancel</button>
              <button className="rzp-pay-btn" onClick={handleAmountSubmit}>Continue →</button>
            </div>
          </div>
        </div>
      )}

      {/* ── FLOW: Razorpay payment modal ── */}
      {flowStep === 'razorpay' && accountDetails && (
        <RazorpayModal
          accountDetails={accountDetails}
          amount={pendingAmount}
          username={username}
          onSuccess={handlePaymentSuccess}
          onClose={() => setFlowStep(null)}
        />
      )}

      {/* ── WITHDRAW MODAL ── */}
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Withdraw Funds</h3>
            <p>User: <strong>{username}</strong></p>
            <p style={{ fontSize: '12px', color: '#666' }}>
              Max withdrawable: ₹{formatCurrency(fundData.availableCash)}
            </p>
            <input
              type="number" placeholder="Enter Amount" value={amountInput} autoFocus
              onChange={e => setAmountInput(e.target.value)}
            />
            <div className="modal-actions">
              <button className="btn btn-blue" onClick={handleWithdraw}>Withdraw</button>
              <button className="btn btn-white" onClick={() => setIsModalOpen(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Funds;