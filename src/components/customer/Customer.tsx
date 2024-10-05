import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Box, Button, TextField } from '@mui/material';
import { mockCustomerList } from '../../mockData/customers';
import { removeTabAndRefresh } from '../../stateManagement/slices/tabsSlice'
import { CustomerData } from '../../interfaces/ICustomer';
import { EntityTabProps } from '../../interfaces/ITab';

const Customer: React.FC<EntityTabProps> = ({ tabId, entityId, parentTabId }) => {
  const dispatch = useDispatch();
  const [data, setData] = useState<CustomerData | null>({
    id: 0,
    name: '',
    email: '',
  });

  const Save = () => {
    // Call API to save
    dispatch(removeTabAndRefresh({ tabId, parentTabId }));
  };

  const getCustomer = () => {
    // Get data from mock data or API
    const customer = mockCustomerList.find((index) => index.id === entityId);
    setData(customer || null);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData((prevData) => prevData ? { ...prevData, [name]: value } : null);
  };

  useEffect(() => {
    if (entityId > 0) {
      getCustomer()
    }
  }, []);

  return (
    <div>
      <TextField
        label="Name"
        name="name"
        value={data?.name}
        onChange={handleInputChange}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Email"
        name="email"
        value={data?.email}
        onChange={handleInputChange}
        fullWidth
        margin="normal"
      />
      <Box display="flex" justifyContent="flex-start" mt={2}>
        <Button
          variant="contained"
          color="primary"
          onClick={Save}
        >
          Save
        </Button>
      </Box>
    </div>
  );
};

export default Customer;