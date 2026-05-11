import React, { useState, useEffect, useCallback } from 'react';
import {
  Table, TableBody, TableCell, TableContainer, TableHead,
  TableRow, Paper, Button, Box,
} from '@mui/material';
import { mockCustomerList } from '../../mockData/customers';
import { addTab, setRefreshedTab } from '../../stateManagement/slices/tabsSlice';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../stateManagement/store';
import { CustomerData } from '../../interfaces/ICustomer';
import { EntityListTabProps } from '../../interfaces/ITab';

const Customers: React.FC<EntityListTabProps> = ({ tabId }) => {
  const [customerList, setCustomerList] = useState<CustomerData[]>([]);
  const dispatch = useDispatch();
  const { refreshedTab } = useSelector((state: RootState) => state.tabs);

  const handleNewCustomer = () => {
    dispatch(addTab({
      tabType: 'Customer',
      tabLabel: 'New customer',
      isRemovableTab: true,
      entityId: 0,
      parentTabId: tabId,
    }));
  };

  const handleEditCustomer = (customerId: number) => {
    dispatch(addTab({
      tabType: 'Customer',
      tabLabel: 'Edit customer',
      isRemovableTab: true,
      entityId: customerId,
      parentTabId: tabId,
    }));
  };

  const getAllCustomers = useCallback(() => {
    // Replace with an API call in a real application
    setCustomerList(mockCustomerList);
  }, []);

  useEffect(() => {
    getAllCustomers();
  }, [getAllCustomers]);

  useEffect(() => {
    if (refreshedTab === tabId) {
      dispatch(setRefreshedTab(undefined));
      getAllCustomers();
    }
  }, [refreshedTab, tabId, dispatch, getAllCustomers]);

  return (
    <div>
      <Box display="flex" justifyContent="flex-start" mb={2}>
        <Button variant="contained" color="primary" onClick={handleNewCustomer}>
          New Customer
        </Button>
      </Box>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>ID</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Actions</TableCell>
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
                    onClick={() => handleEditCustomer(customer.id)}
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
