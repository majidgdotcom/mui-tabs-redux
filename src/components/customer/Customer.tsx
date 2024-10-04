import React, { useState, useEffect } from 'react';
import { EntityTabProps } from "../../stateManagement/tabsSlice";
import { Button, TextField } from '@mui/material';
import { CustomerData, mockCustomerList } from '../../mockData/customers';

const Customer: React.FC<EntityTabProps> = ({ tabId, entityId, parentTabId, closeEntity, handleRemoveTab }) => {
  const [data, setData] = useState<CustomerData | null>(null);

  const Save = () => {
    // Call API to save
    closeEntity()
    handleRemoveTab(tabId, parentTabId)
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
    getCustomer()
  }, [tabId]);

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
      <Button
        variant="contained"
        color="primary"
        onClick={Save}
        style={{ marginBottom: '16px' }}
      >
        Save
      </Button>
    </div>
  );
};

export default Customer;