import React from 'react';
import PropTypes from 'prop-types';
import Trsansactions from "./Trsansactions";
import "../style/TransactionList.css";

export default function TransactionList({ transactions, deleteTransaction }) {
    return (
        <div className="transaction-list-container">
            <h2>Transaction History</h2>

            {(!transactions || transactions.length === 0) ? (
                <p>No transactions available.</p>
            ) : (
                <ul>
                    {transactions.map(t => (
                        <Trsansactions
                            key={t.id}
                            {...t}
                            onDelete={deleteTransaction}
                        />
                    ))}
                </ul>
            )}
        </div>
    );
}

TransactionList.propTypes = {
    transactions: PropTypes.array.isRequired,
    deleteTransaction: PropTypes.func.isRequired
};
