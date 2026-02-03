import { useState, useEffect } from 'react';
import "../style/ExpenseModal.css";

// Categories for the dropdown
const CATEGORIES = {
  EXPENSE: [
    { value: 'food', label: 'Food 🍔' },
    { value: 'transport', label: 'Transport 🚕' },
    { value: 'entertainment', label: 'Entertainment 🎮' },
    { value: 'shopping', label: 'Shopping 🛒' },
    { value: 'utilities', label: 'Utilities 💡' },
    { value: 'health', label: 'Health 🏥' },
    { value: 'education', label: 'Education 📚' },
    { value: 'other', label: 'Other' }
  ],
  INCOME: [
    { value: 'salary', label: 'Salary 💼' },
    { value: 'freelance', label: 'Freelance 💻' },
    { value: 'investment', label: 'Investment 📈' },
    { value: 'gift', label: 'Gift 🎁' },
    { value: 'business', label: 'Business 🏢' },
    { value: 'other', label: 'Other' }
  ]
};

export default function EditTransactionModal({ 
  transaction, 
  onClose, 
  updateTransaction 
}) {
  const [text, setText] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [date, setDate] = useState('');
  const [error, setError] = useState('');

  // Pre-fill form with transaction data when component mounts or transaction changes
  useEffect(() => {
    if (transaction) {
      setText(transaction.text);
      setAmount(Math.abs(transaction.amount).toString()); // Show positive number
      setCategory(transaction.category);
      setDate(transaction.date);
    }
  }, [transaction]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!text || !amount || !category || !date) {
      setError('Please fill in all fields');
      return;
    }

    // Create updated transaction
    const updatedTransaction = {
      ...transaction, // Keep the id and other properties
      text,
      amount: transaction.type === 'expense' 
        ? -Math.abs(Number(amount)) // Negative for expense
        : Math.abs(Number(amount)),  // Positive for income
      category,
      date
    };

    updateTransaction(updatedTransaction);
    onClose();
  };

  // Determine which categories to show based on transaction type
  const categories = transaction?.type === 'income' 
    ? CATEGORIES.INCOME 
    : CATEGORIES.EXPENSE;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div 
        className={`modal-content ${transaction?.type === 'income' ? 'income-modal' : 'expense-modal'}`}
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
      >
        <button className="close-x" onClick={onClose}>×</button>
        
        <h2>✏️ Edit {transaction?.type === 'income' ? 'Income' : 'Expense'}</h2>

        {error && <p className="error">{error}</p>}

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder={transaction?.type === 'income' ? "Income Source" : "Expense Name"}
            value={text}
            onChange={(e) => setText(e.target.value)}
            required
          />

          <input
            type="number"
            placeholder="Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            min="0"
            step="0.01"
            required
          />

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="category-select"
            required
          >
            <option value="" disabled>Select a category</option>
            {categories.map((cat) => (
              <option key={cat.value} value={cat.value}>
                {cat.label}
              </option>
            ))}
          </select>

          <div className="date-input-container">
            <label>Date:</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              max={new Date().toISOString().split('T')[0]}
              required
            />
          </div>

          <div className="modal-buttons">
            <button 
              type="submit" 
              className={transaction?.type === 'income' ? 'income-btn' : 'expense-btn'}
            >
              Update Transaction
            </button>
            <button type="button" onClick={onClose}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
}