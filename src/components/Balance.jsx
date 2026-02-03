import React, { useState } from 'react';
import "../style/Balance.css";

export default function Balance({ transactions})
{

    //reduce le chai sab data li euta single data ma convert garxa 
   const totalBalance = transactions.reduce( 
    ( accumulator , transactions ) => accumulator + transactions.amount,0 //amount means the variable used in data file 
   ); //starting value 0 ho 

  const totalIncome = transactions
     .filter( transactions => transactions.amount > 0)  //In array data spending huda -ve ma hunxa so this filter that and shows +ve 
     .reduce( (accumulator , transactions) => accumulator + transactions.amount,0); //no sums hunxa

   const totalExpense = transactions 
     .filter( transactions => transactions.amount < 0 ) // only shows -ve value
     .reduce( (accumulator , transactions) => accumulator + transactions.amount,0); //sum

    const totalSavings = totalIncome + totalExpense; // Expense is negative



  // Get date range
   const getDateRange = () => {
    if (transactions.length === 0) return '';
    
    const dates = transactions.map(t => new Date(t.date));
    const minDate = new Date(Math.min(...dates));
    const maxDate = new Date(Math.max(...dates));
    
    const format = (date) => date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    
    return `${format(minDate)} - ${format(maxDate)}`;

    
  };


    return(
        <div className = "balance-container">
            <h2 className="balance-title">Your Financial Summary</h2>

        <div className = "summary-cards">
               {/* Income Card */}
        <div className="summary-card income-card">
          <div className="card-icon">💰</div>
          <div className="card-content">
            <h3 className="card-title">Income</h3>
            <p className="card-amount positive">Rs{totalIncome.toFixed(2)}</p>
          </div>
        </div>

        {/* Expense Card */}
        <div className="summary-card expense-card">
          <div className="card-icon">💸</div>
          <div className="card-content">
            <h3 className="card-title">Expense</h3>
            <p className="card-amount negative">Rs{Math.abs(totalExpense).toFixed(2)}</p>
          </div>
        </div>

        {/* Savings Card */}
        <div className="summary-card savings-card">
          <div className="card-icon">🏦</div>
          <div className="card-content">
            <h3 className="card-title">Savings</h3>
            <p className={`card-amount {totalSavings >= 0 ? 'positive' : 'negative'}`}>
              Rs{totalSavings.toFixed(2)}
            </p>
          </div>
        </div>
      </div>
     </div>
    );
}