import { useState } from 'react';
import CategoryChart from '../components/CategoryChart.jsx';
import Header from '../components/Header.jsx';
import Footer from '../components/Footer.jsx';
import TransactionList from '../components/TransactionList.jsx';
import Balance from '../components/Balance.jsx';
import ExpenseModal from '../components/ExpenseModel.jsx';
import IncomeModal from '../components/IncomeModal.jsx';
import '../style/HomePage.css';

export default function HomePage({ transactions, addTransaction, deleteTransaction }) {
  // TWO SEPARATE STATES for two modals
  const [isIncomeModalOpen, setIsIncomeModalOpen] = useState(false);
  const [isExpenseModalOpen, setIsExpenseModalOpen] = useState(false);
  
  const categoryData = transactions.reduce((acc, t) => {
    const found = acc.find(item => item.category === t.category);
    if (found) {
      found.value += Math.abs(t.amount);
    } else {
      acc.push({ category: t.category, value: Math.abs(t.amount) });
    }
    return acc;
  }, []);

  return(
    <div className="home-page">
      <Header />
     
      <main className="main-content">
        <Balance transactions={transactions}/>
        
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

        <CategoryChart data={categoryData} />

        <TransactionList 
          transactions={transactions}
          deleteTransaction={deleteTransaction}
        />
      </main>

      <Footer />
    </div>
  );
}