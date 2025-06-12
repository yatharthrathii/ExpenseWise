// __tests__/App.test.jsx
import { render, screen } from '@testing-library/react';
import App from '../App';
import { BrowserRouter } from 'react-router-dom';

test('renders ExpenseWise header', () => {
  render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
  expect(screen.getByText(/ExpenseWise/i)).toBeInTheDocument();
});

// __tests__/AddExpenseForm.test.jsx
import { render, screen, fireEvent } from '@testing-library/react';
import AddExpenseForm from '../components/AddExpenseForm';

test('renders form inputs and button', () => {
  render(<AddExpenseForm />);
  expect(screen.getByPlaceholderText(/Title/i)).toBeInTheDocument();
  expect(screen.getByPlaceholderText(/Amount/i)).toBeInTheDocument();
  expect(screen.getByText(/Add Expense/i)).toBeInTheDocument();
});

test('shows error when form submitted empty', () => {
  render(<AddExpenseForm />);
  fireEvent.click(screen.getByText(/Add Expense/i));
  expect(screen.getByText(/Please fill all fields/i)).toBeInTheDocument();
});

// __tests__/Expenses.test.jsx
import { render, screen } from '@testing-library/react';
import Expenses from '../pages/Expenses';
import { Provider } from 'react-redux';
import store from '../store/store';

test('renders "No expenses yet" when list is empty', () => {
  render(
    <Provider store={store}>
      <Expenses />
    </Provider>
  );
  expect(screen.getByText(/No expenses yet/i)).toBeInTheDocument();
});

// __tests__/Header.test.jsx
import { render, screen } from '@testing-library/react';
import Header from '../components/Header';
import { Provider } from 'react-redux';
import store from '../store/store';
import { BrowserRouter } from 'react-router-dom';

test('Header shows login when not logged in', () => {
  render(
    <Provider store={store}>
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    </Provider>
  );
  expect(screen.getByText(/Login/i)).toBeInTheDocument();
});

// Dummy premium state injection test
import { configureStore } from '@reduxjs/toolkit';
import expensesReducer from '../store/expensesSlice';
import themeReducer from '../store/themeSlice';

test('Unlock Premium button shows for total > 10000', () => {
  const customStore = configureStore({
    reducer: {
      expenses: expensesReducer,
      theme: themeReducer
    },
    preloadedState: {
      expenses: {
        expenses: [
          { title: 'A', amount: 6000, category: 'Food', timestamp: '123' },
          { title: 'B', amount: 5000, category: 'Travel', timestamp: '124' }
        ],
        isPremium: false
      },
      theme: { isDarkMode: false }
    }
  });

  render(
    <Provider store={customStore}>
      <Expenses />
    </Provider>
  );

  expect(screen.getByText(/Unlock Premium/i)).toBeInTheDocument();
});
