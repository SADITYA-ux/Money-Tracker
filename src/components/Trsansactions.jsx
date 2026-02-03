import React from 'react';
import "../style/Transaction.css";

export default function Transactions( { id, title, amount, category, onDelete , onEdit} )
{
    const isIncome = amount >= 0;
    return(
        <div className = {`transactions ${ isIncome ? 'income' : 'expense'}`}>

            <div className = "transaction-info">
                <h3>{title}</h3>
                <span className = "transaction-category">{category}</span>
            </div>

            
            <div className = "transaction-amount"> 
                <span> {isIncome ? '+' : '-'}Rs.{Math.abs(amount)}</span> 
            </div>

            <div className="transaction-actions">
            <button 
                className="edit-btn"
                onClick={() => onEdit(id)}
                title="Edit transaction"
            >✏️</button>

            <button 
                className = "delete-btn"
                onClick = { () => onDelete(id)}
            >Delete</button>
            
        </div>
    </div>
    );
}