import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';
import { mockProductList, ProductData } from '../../mockData/product';
import { EntityListTabProps } from '../../stateManagement/tabsSlice';

const Products: React.FC<EntityListTabProps> = ({ tabId, openEntity }) => {
  const [productList, setProductList] = useState<ProductData[]>([]);

  const handleNewProduct = () => {
    openEntity('Product', 0, '', tabId, closeProduct);
  };

  const handleEditProduct = (productId: number, productName: string) => {
    openEntity('Product', productId, productName, tabId, closeProduct);
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
                    onClick={() => handleEditProduct(product.id, product.name)}
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