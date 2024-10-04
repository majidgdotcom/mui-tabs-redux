import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Select, MenuItem } from '@mui/material';
import { mockProductList, ProductData } from '../../mockData/product';
import { EntityListTabProps } from '../../stateManagement/tabsSlice';
import { addTab} from '../../stateManagement/tabsSlice'
import { useDispatch } from 'react-redux';

const Products: React.FC<EntityListTabProps> = ({ tabId }) => {
  const [productList, setProductList] = useState<ProductData[]>([]);
  const [type, setType] = useState<number>(3);
  const dispatch = useDispatch();

  const handleNewProduct = () => {
    dispatch(
      addTab({
        tabType: 'Product',
        tabLabel: 'New product',
        isRemovableTab: true,
        entityId: 0,
        parentTabId: tabId,
        closeTab: closeProduct,
        customParameter: {
          type: type
        },
      })
    );
  };

  const handleEditProduct = (productId: number) => {
    dispatch(
      addTab({
        tabType: 'Product',
        tabLabel: 'Edit product',
        isRemovableTab: true,
        entityId: productId,
        parentTabId: tabId,
        closeTab: closeProduct,
        customParameter: {
          type: type
        },
      })
    );
  };

  const closeProduct = () => {
    // Refresh data list by calling API
    getAllProduct()
  };

  const getAllProduct = () => {
    // Get data list by API or mock data
    setProductList(mockProductList);
  };

  useEffect(() => {
    getAllProduct()
  }, [tabId]);

  return (
    <div>
      <Select
        value={type}
        onChange={(e) => setType(Number(e.target.value))}
        label="Type">
        <MenuItem key={1} value={1}>Type 1</MenuItem>
        <MenuItem key={2} value={2}>Type 2</MenuItem>
        <MenuItem key={3} value={3}>Type 3</MenuItem>
        <MenuItem key={4} value={4}>Type 4</MenuItem>
      </Select>
      <Button
        variant="contained"
        color="primary"
        onClick={handleNewProduct}
        style={{ marginBottom: '16px' }}
      >
        New Product
      </Button>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>ID</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Actions</TableCell> {/* Column for buttons */}
            </TableRow>
          </TableHead>
          <TableBody>
            {productList.map((product) => (
              <TableRow key={product.id}>
                <TableCell>{product.name}</TableCell>
                <TableCell>{product.id}</TableCell>
                <TableCell>${product.price}</TableCell>
                <TableCell>{product.category}</TableCell>
                <TableCell>
                  <Button
                    variant="outlined"
                    color="primary"
                    onClick={() => handleEditProduct(product.id)}
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

export default Products;