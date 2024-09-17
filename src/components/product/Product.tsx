import React, { useState, useEffect } from 'react';
import { EntityTabProps } from '../../stateManagement/tabsSlice';
import { Button, TextField } from '@mui/material';
import { mockProductList, ProductData } from '../../mockData/product';

const Product: React.FC<EntityTabProps> = ({ tabId, entityId, listTabId, closeEntity, handleRemoveTab }) => {
  const [data, setData] = useState<ProductData | null>(null);

  const Save = () => {
    // Call API to save
    closeEntity()
    handleRemoveTab(tabId, listTabId)
  };

  const getProduct = () => {
    // Get data from mock data or API
    const product = mockProductList.find((index) => index.id === entityId);
    setData(product || null);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData((prevData) => prevData ? { ...prevData, [name]: value } : null);
  };

  useEffect(() => {
    getProduct()
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
        label="Category"
        name="category"
        value={data?.category}
        onChange={handleInputChange}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Price"
        name="price"
        value={data?.price}
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

export default Product;