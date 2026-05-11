import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import tabsReducer from './stateManagement/slices/tabsSlice';
import App from './App';

const renderApp = () => {
  const store = configureStore({ reducer: { tabs: tabsReducer } });
  return render(<Provider store={store}><App /></Provider>);
};

test('renders the Customers and Products tabs', () => {
  renderApp();
  expect(screen.getByText('Customers')).toBeInTheDocument();
  expect(screen.getByText('Products')).toBeInTheDocument();
});
