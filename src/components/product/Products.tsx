import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Select, MenuItem, FormControl, InputLabel, Box } from '@mui/material';
import { mockProductList } from '../../mockData/product';
import { addTab, setRefreshedTab } from '../../stateManagement/slices/tabsSlice'
import { useSelector, useDispatch } from 'react-redux';
import { ProductCategory, ProductData } from '../../interfaces/IProduct';
import { EntityListTabProps } from '../../interfaces/ITab';

const Products: React.FC<EntityListTabProps> = ({ tabId }) => {
  const [productList, setProductList] = useState<ProductData[]>([]);
  const dispatch = useDispatch();
  const { refreshedTab } = useSelector((state: any) => state.tabs);

  const handleNewProduct = () => {
    dispatch(
      addTab({
        tabType: 'Product',
        tabLabel: 'New product',
        isRemovableTab: true,
        entityId: 0,
        parentTabId: tabId,
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
      })
    );
  };

  const getAllProduct = () => {
    // Get Product list by API or mock data
    setProductList(mockProductList);
  };

  const getCategory = (id: number): string | undefined => {
    return ProductCategory.find((item) => item.id === id)?.title
  }

  useEffect(() => {
    getAllProduct()
  }, []);

  useEffect(() => {
    if (refreshedTab === tabId) {
      dispatch(setRefreshedTab(undefined))
      getAllProduct()
    }
  }, [refreshedTab]);

  return (
    <div>
      <Box display="flex" justifyContent="flex-start" mb={2}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleNewProduct}
        >
          New Product
        </Button>
      </Box>
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
                <TableCell>{getCategory(product.categoryId)}</TableCell>
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