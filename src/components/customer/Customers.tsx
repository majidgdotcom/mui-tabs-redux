import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';
import { CustomerData, mockCustomerList } from '../../mockData/customers';
import { EntityListTabProps } from '../../stateManagement/tabsSlice';
import { addTab, setRefreshedTab } from '../../stateManagement/tabsSlice'
import { useSelector, useDispatch } from 'react-redux';

const Customers: React.FC<EntityListTabProps> = ({ tabId }) => {
  const [customerList, setCustomerList] = useState<CustomerData[]>([]);
  const dispatch = useDispatch();
  const { refreshedTab } = useSelector((state: any) => state.tabs);

  const handleNewCustomer = () => {
    dispatch(
      addTab({
        tabType: 'Customer',
        tabLabel: 'New customer',
        isRemovableTab: true,
        entityId: 0,
        parentTabId: tabId,
      })
    );
  };

  const handleEditCustomer = (customerId: number) => {
    dispatch(
      addTab({
        tabType: 'Customer',
        tabLabel: 'Edit customer',
        isRemovableTab: true,
        entityId: customerId,
        parentTabId: tabId,
      })
    );
  };

  const getAllCustomer = () => {
    console.log('Get Customer list by API or mock data')
    setCustomerList(mockCustomerList);
  };

  useEffect(() => {
    getAllCustomer()
  }, []);

  useEffect(() => {
    if (refreshedTab === tabId) {
      dispatch(setRefreshedTab(undefined))
      getAllCustomer()
    }
  }, [refreshedTab]);

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