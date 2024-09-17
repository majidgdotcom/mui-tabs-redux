import React from 'react';
import { EntityTabProps } from "../../stateManagement/tabsSlice";
import { Button } from '@mui/material';

const Customer: React.FC<EntityTabProps> = ({ tabId, entityId, entityTitle,listTabId, closeEntity, handleRemoveTab }) => {

  const Save = () => {
    closeEntity()
    handleRemoveTab(tabId,listTabId)
  };

  return (
    <div>
      <h2>Customer ID: {entityId}</h2>
      <h2>Customer Title: {entityTitle}</h2>

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