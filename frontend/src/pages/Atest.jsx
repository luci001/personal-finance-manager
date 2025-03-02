import './analytic.css'
import React from "react";
import { Container, Row } from "react-bootstrap";
import CircularProgressBar from "../components/CircularProgressBar";
import LineProgressBar from "../components/LineProgressBar";
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

const Analytics = () => {
    // Sample transactions for testing
    const transactions = [
        { id: 1, transactionType: "credit", amount: 5000, category: "Salary" },
        { id: 2, transactionType: "expense", amount: 1500, category: "Rent" },
        { id: 3, transactionType: "expense", amount: 800, category: "Groceries" },
        { id: 4, transactionType: "credit", amount: 2000, category: "Tip" },
        { id: 5, transactionType: "expense", amount: 400, category: "Food" },
        { id: 6, transactionType: "credit", amount: 1000, category: "Other" },
        { id: 7, transactionType: "expense", amount: 600, category: "Medical" },
        { id: 8, transactionType: "expense", amount: 500, category: "Entertainment" }
    ];

    const TotalTransactions = transactions.length;
    const totalIncomeTransactions = transactions.filter(t => t.transactionType === "credit");
    const totalExpenseTransactions = transactions.filter(t => t.transactionType === "expense");

    const totalIncomePercent = (totalIncomeTransactions.length / TotalTransactions) * 100;
    const totalExpensePercent = (totalExpenseTransactions.length / TotalTransactions) * 100;

    const totalTurnOver = transactions.reduce((acc, t) => acc + t.amount, 0);
    const totalTurnOverIncome = totalIncomeTransactions.reduce((acc, t) => acc + t.amount, 0);
    const totalTurnOverExpense = totalExpenseTransactions.reduce((acc, t) => acc + t.amount, 0);

    const TurnOverIncomePercent = (totalTurnOverIncome / totalTurnOver) * 100;
    const TurnOverExpensePercent = (totalTurnOverExpense / totalTurnOver) * 100;

    const categories = ["Groceries", "Rent", "Salary", "Tip", "Food", "Medical", "Utilities", "Entertainment", "Transportation", "Other"];
    const colors = {
        "Groceries": '#FF6384', "Rent": '#36A2EB', "Salary": '#FFCE56',
        "Tip": '#4BC0C0', "Food": '#9966FF', "Medical": '#FF9F40',
        "Utilities": '#8AC926', "Entertainment": '#6A4C93',
        "Transportation": '#1982C4', "Other": '#F45B69',
    };

    return (
        <Container className="mt-5">
            <Row>
                {/* Total Transactions */}
                <div className="col-lg-3 col-md-6 mb-4">
                    <div className="card h-100">
                        <div className="card-header bg-dark text-white">
                            <strong>Total Transactions:</strong> {TotalTransactions}
                        </div>
                        <div className="card-body">
                            <h5 style={{ color: "green" }}>
                                Income: <ArrowDropUpIcon /> {totalIncomeTransactions.length}
                            </h5>
                            <h5 style={{ color: "red" }}>
                                Expense: <ArrowDropDownIcon /> {totalExpenseTransactions.length}
                            </h5>
                            <CircularProgressBar percentage={totalIncomePercent.toFixed(0)} color="green" />
                            <CircularProgressBar percentage={totalExpensePercent.toFixed(0)} color="red" />
                        </div>
                    </div>
                </div>

                {/* Total Turnover */}
                <div className="col-lg-3 col-md-6 mb-4">
                    <div className="card h-100">
                        <div className="card-header bg-dark text-white">
                            <strong>Total TurnOver:</strong> {totalTurnOver} <CurrencyRupeeIcon />
                        </div>
                        <div className="card-body">
                            <h5 style={{ color: "green" }}>
                                Income: <ArrowDropUpIcon /> {totalTurnOverIncome} <CurrencyRupeeIcon />
                            </h5>
                            <h5 style={{ color: "red" }}>
                                Expense: <ArrowDropDownIcon /> {totalTurnOverExpense} <CurrencyRupeeIcon />
                            </h5>
                            <CircularProgressBar percentage={TurnOverIncomePercent.toFixed(0)} color="green" />
                            <CircularProgressBar percentage={TurnOverExpensePercent.toFixed(0)} color="red" />
                        </div>
                    </div>
                </div>

                {/* Category-wise Income */}
                <div className="col-lg-3 col-md-6 mb-4">
                    <div className="card h-100">
                        <div className="card-header bg-dark text-white">
                            <strong>Category-wise Income</strong>
                        </div>
                        <div className="card-body">
                            {categories.map(category => {
                                const income = transactions
                                    .filter(t => t.transactionType === "credit" && t.category === category)
                                    .reduce((acc, t) => acc + t.amount, 0);
                                const incomePercent = (income / totalTurnOver) * 100;

                                return income > 0 && (
                                    <LineProgressBar key={category} label={category} percentage={incomePercent.toFixed(0)} lineColor={colors[category]} />
                                );
                            })}
                        </div>
                    </div>
                </div>

                {/* Category-wise Expense */}
                <div className="col-lg-3 col-md-6 mb-4">
                    <div className="card h-100">
                        <div className="card-header bg-dark text-white">
                            <strong>Category-wise Expense</strong>
                        </div>
                        <div className="card-body">
                            {categories.map(category => {
                                const expenses = transactions
                                    .filter(t => t.transactionType === "expense" && t.category === category)
                                    .reduce((acc, t) => acc + t.amount, 0);
                                const expensePercent = (expenses / totalTurnOver) * 100;

                                return expenses > 0 && (
                                    <LineProgressBar key={category} label={category} percentage={expensePercent.toFixed(0)} lineColor={colors[category]} />
                                );
                            })}
                        </div>
                    </div>
                </div>
            </Row>
        </Container>
    );
};

export default Analytics;
