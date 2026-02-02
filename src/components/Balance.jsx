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

    return(
        <div className = "balance-container">
            <h2>Your Financial Summary</h2>

            <div className = "balance">
                <h3><strong>Total Balance:</strong>{totalBalance}</h3>
                <h3><strong>Total Income:</strong>{totalIncome}</h3>
                <h3><strong>Total Expense:</strong>{totalExpense}</h3>
            </div>
        </div>
    );
}