import React from 'react';
import {Link} from 'react-router-dom';
import '../style/Header.css';

export default function Header()
{
    return (
        <header className = "app-header">
            <div className = "topic">
                <h1>Expense Tracker</h1>
            </div>
            <div className = "nav-link">
                <Link to = "/">Home</Link>
            </div>
        </header>
    )
}