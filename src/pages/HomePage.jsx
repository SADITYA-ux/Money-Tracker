import { useState , useMemo } from 'react';
import CategoryChart from '../components/CategoryChart.jsx';
import Header from '../components/Header.jsx';
import Footer from '../components/Footer.jsx';
import TransactionList from '../components/TransactionList.jsx';
import Balance from '../components/Balance.jsx';
import ExpenseModal from '../components/ExpenseModel.jsx';
import IncomeModal from '../components/IncomeModal.jsx';
import EditTransactionModal from '../components/EditTransactionModal.jsx'; // ADD THIS IMPORT
import '../style/HomePage.css';

export default function HomePage({ 
  transactions, 
  addTransaction, 
  deleteTransaction,
  updateTransaction // ADD THIS PROP
}) {
  // TWO SEPARATE STATES for two modals
  const [isIncomeModalOpen, setIsIncomeModalOpen] = useState(false);
  const [isExpenseModalOpen, setIsExpenseModalOpen] = useState(false);
  const [dateFilter, setDateFilter] = useState('all');
  const [isEditModalOpen, setIsEditModalOpen] = useState(false); 
  const [editingTransaction, setEditingTransaction] = useState(null);

  const handleEditTransaction = (id) => {
    const transaction = transactions.find(t => t.id === id);
    setEditingTransaction(transaction);
    setIsEditModalOpen(true);
  };

  const filteredTransactions = useMemo(() => {
    if(dateFilter === 'all') {
      return transactions;
    }

    const today = new Date();
    const todayStr = today.toISOString().split('T')[0];

    return transactions.filter(transaction => {
      const transDate = new Date(transaction.date);
      
      switch(dateFilter) {
        case 'today':
          return transaction.date === todayStr;
          
        case 'week':
          const weekAgo = new Date();
          weekAgo.setDate(today.getDate() - 7);
          return transDate >= weekAgo;
          
        case 'month':
          const monthAgo = new Date();
          monthAgo.setMonth(today.getMonth() - 1);
          return transDate >= monthAgo;
          
        default:
          return true;
      }
    });
  }, [transactions, dateFilter]);
  
  // Sort transactions by date (newest first)
  const sortedTransactions = useMemo(() => {
    return [...filteredTransactions].sort((a, b) => 
      new Date(b.date) - new Date(a.date)
    );
  }, [filteredTransactions]);
  
  // Calculate category data from FILTERED transactions
  const categoryData = useMemo(() => {
    return filteredTransactions.reduce((acc, t) => {
      const found = acc.find(item => item.category === t.category);
      if (found) {
        found.value += Math.abs(t.amount);
      } else {
        acc.push({ category: t.category, value: Math.abs(t.amount) });
      }
      return acc;
    }, []);
  }, [filteredTransactions]);

  return(
    <div className="home-page">
      <Header />
     
      <main className="main-content">
        {/* Use SORTED transactions for Balance */}
        <Balance transactions={sortedTransactions}/>

        {/* Date Filter */}
        <div className="date-filters">
          <button 
            className={`filter-btn ${dateFilter === 'all' ? 'active' : ''}`}
            onClick={() => setDateFilter('all')}
          >
            All
          </button>
          <button 
            className={`filter-btn ${dateFilter === 'today' ? 'active' : ''}`}
            onClick={() => setDateFilter('today')}
          >
            Today
          </button>
          <button 
            className={`filter-btn ${dateFilter === 'week' ? 'active' : ''}`}
            onClick={() => setDateFilter('week')}
          >
            This Week
          </button>
          <button 
            className={`filter-btn ${dateFilter === 'month' ? 'active' : ''}`}
            onClick={() => setDateFilter('month')}
          >
            This Month
          </button>
        </div>
        
        {/* Show transaction count */}
        <div className="filter-info">
          Showing {sortedTransactions.length} of {transactions.length} transactions
        </div>
        
        {/* Two buttons for two different modals */}
        <div className="transaction-buttons">
          <button 
            className="income-button" 
            onClick={() => setIsIncomeModalOpen(true)}
          >
            💰 Add Income
          </button>
          
          <button 
            className="expense-button" 
            onClick={() => setIsExpenseModalOpen(true)}
          >
            💸 Add Expense
          </button>
        </div>

        {/* Income Modal */}
        {isIncomeModalOpen && (
          <IncomeModal
            addTransaction={addTransaction}
            onClose={() => {
              console.log("Closing income modal");
              setIsIncomeModalOpen(false);
            }}
          />
        )}

        {/* Expense Modal */}
        {isExpenseModalOpen && (
          <ExpenseModal
            addTransaction={addTransaction}
            onClose={() => {
              console.log("Closing expense modal");
              setIsExpenseModalOpen(false);
            }}
          />
        )}

        {/* Edit Transaction Modal - FIXED COMPONENT NAME */}
        {isEditModalOpen && editingTransaction && (
          <EditTransactionModal
            transaction={editingTransaction}
            updateTransaction={updateTransaction}
            onClose={() => {
              setIsEditModalOpen(false);
              setEditingTransaction(null);
            }}
          />
        )}

        {/* Use filtered category data */}
        <CategoryChart data={categoryData} />

        {/* Use SORTED transactions and pass edit handler */}
        <TransactionList 
          transactions={sortedTransactions}
          deleteTransaction={deleteTransaction}
          editTransaction={handleEditTransaction} // PASS THIS
        />
      </main>

      <Footer />
    </div>
  );
}