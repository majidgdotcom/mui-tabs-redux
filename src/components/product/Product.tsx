import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { EntityTabProps } from '../../stateManagement/tabsSlice';
import { Button, TextField } from '@mui/material';
import { mockProductList, ProductData } from '../../mockData/product';
import { removeTab } from '../../stateManagement/tabsSlice'
const Product: React.FC<EntityTabProps> = ({ tabId, entityId, parentTabId, closeEntity, customParameter }) => {
  const dispatch = useDispatch();
  const [data, setData] = useState<ProductData | null>(null);

  const Save = () => {
    // Call API to save
    closeEntity()
    dispatch(removeTab({ tabId, parentTabId }));
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
      <h2>
        Type:{customParameter.type}
      </h2>
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