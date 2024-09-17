import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';
import { productList } from '../../mockData/product';
import { EntityListTabProps } from '../../stateManagement/tabsSlice';

const Products: React.FC<EntityListTabProps> = ({ tabId, openEntity }) => {

  const handleNewProduct = () => {
    openEntity('Product',0, '', tabId, closeProduct);
  };

  const handleEditProduct = (productId: number, productName: string) => {
    openEntity('Product',productId, productName, tabId, closeProduct);
  };

  const closeProduct = () => {
    //refresh data list
  };

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