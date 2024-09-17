import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';
import { customerList } from '../../mockData/customers';
import { EntityListTabProps } from '../../stateManagement/tabsSlice';

const Customers: React.FC<EntityListTabProps> = ({ tabId, openEntity }) => {

  const handleNewCustomer = () => {
    openEntity(0, '', tabId, closeCustomer);
  };

  const handleEditCustomer = (customerId: number, customerName: string) => {
    openEntity(customerId, customerName, tabId, closeCustomer);
  };

  const closeCustomer = () => {
    //refresh data list
  };

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