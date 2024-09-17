import React from 'react';
import { EntityTabProps } from '../../stateManagement/tabsSlice';
import { Button } from '@mui/material';

const Product: React.FC<EntityTabProps> = ({ tabId, entityId, entityTitle,listTabId, closeEntity, handleRemoveTab }) => {

  const Save = () => {
    closeEntity()
    handleRemoveTab(tabId,listTabId)
  };

  return (
    <div>
      <h2>Product ID: {entityId}</h2>
      <p>Title: {entityTitle}</p>
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