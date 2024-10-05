import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Box, Button, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, TextField } from '@mui/material';
import { mockProductList } from '../../mockData/product';
import { removeTabAndRefresh } from '../../stateManagement/slices/tabsSlice'
import { ProductCategory, ProductData } from '../../interfaces/IProduct';
import { EntityTabProps } from '../../interfaces/ITab';

const Product: React.FC<EntityTabProps> = ({ tabId, entityId, parentTabId }) => {
  const dispatch = useDispatch();
  const [data, setData] = useState<ProductData | null>({
    id: 0,
    name: '',
    price: 0,
    categoryId: 1,
  });

  const Save = () => {
    // Call API to save
    dispatch(removeTabAndRefresh({ tabId, parentTabId }));
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

  const handleSelectChange = (e: SelectChangeEvent<number>) => {
    const { value } = e.target;
    setData((prevData) => prevData ? { ...prevData, categoryId: value as number } : null);
  };

  useEffect(() => {
    if (entityId > 0) {
      getProduct()
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
      <FormControl fullWidth>
        <InputLabel id="category-label">Category</InputLabel>
        <Select
          value={data?.categoryId || ''}
          onChange={handleSelectChange}
          label="Category"
        >
          {ProductCategory.map((item, index) => (
            <MenuItem key={index} value={item.id}>{item.title}</MenuItem>
          ))}
        </Select>
      </FormControl>
      <TextField
        label="Price"
        name="price"
        value={data?.price}
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

export default Product;