import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';
import { CustomerData, mockCustomerList } from '../../mockData/customers';
import { EntityListTabProps } from '../../stateManagement/tabsSlice';

const Customers: React.FC<EntityListTabProps> = ({ tabId, openEntity }) => {
  const [customerList, setCustomerList] = useState<CustomerData[]>([]);

  const handleNewCustomer = () => {
    openEntity('Customer', 0, '', tabId, closeCustomer);
  };

  const handleEditCustomer = (customerId: number, customerName: string) => {
    openEntity('Customer', customerId, customerName, tabId, closeCustomer);
  };

  const closeCustomer = () => {
    // Refresh data list by calling API
    getAllCustomer()
  };

  const getAllCustomer = () => {
    // Get data list by API or mock data
    setCustomerList(mockCustomerList);
  };

  useEffect(() => {
    getAllCustomer()
  }, [tabId]);

  return (
    <div>
      <Button
        variant="contained"
        color="primary"
        onClick={handleNewCustomer}
        style={{ marginBottom: '16px' }}
      >
        New Customer
      </Button>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>ID</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Actions</TableCell> {/* Column for buttons */}
            </TableRow>
          </TableHead>
          <TableBody>
            {customerList.map((customer) => (
              <TableRow key={customer.id}>
                <TableCell>{customer.name}</TableCell>
                <TableCell>{customer.id}</TableCell>
                <TableCell>{customer.email}</TableCell>
                <TableCell>
                  <Button
                    variant="outlined"
                    color="primary"
                    onClick={() => handleEditCustomer(customer.id, customer.name)}
                  >
                    Edit
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default Customers;