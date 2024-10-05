import React, { lazy, Suspense } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Tabs, Tab, Box, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { removeTab, setActiveTab } from '../../stateManagement/slices/tabsSlice'
import { TabData } from '../../interfaces/ITab';

const Customers = lazy(() => import('../customer/Customers'));
const Customer = lazy(() => import('../customer/Customer'));
const Products = lazy(() => import('../product/Products'));
const Product = lazy(() => import('../product/Product'));


const TabsComponent: React.FC = () => {
  const dispatch = useDispatch();
  const { tabs, activeTabIndex } = useSelector((state: any) => state.tabs);

  const handleRemoveTab = (tabId: number, parentTabId: number) => {
    dispatch(removeTab({ tabId, parentTabId }));
  };

  const renderTabContent = (tab: TabData) => {
    switch (tab.tabType) {
      case 'Customers':
        return (
          <Suspense fallback={<div>Loading...</div>}>
            <Customers
              tabId={tab.tabId}
            />
          </Suspense>
        );
      case 'Products':
        return (
          <Suspense fallback={<div>Loading...</div>}>
            <Products
              tabId={tab.tabId}
            />
          </Suspense>
        );
      case 'Customer':
        return (
          <Suspense fallback={<div>Loading...</div>}>
            <Customer
              tabId={tab.tabId}
              entityId={tab.entityId!}
              parentTabId={tab.parentTabId!}
              customParameter={tab.customParameter}
            />
          </Suspense>
        );
      case 'Product':
        return (
          <Suspense fallback={<div>Loading...</div>}>
            <Product
              tabId={tab.tabId}
              entityId={tab.entityId!}
              parentTabId={tab.parentTabId!}
              customParameter={tab.customParameter}
            />
          </Suspense>
        );
      default:
        return <div>No content available</div>;
    }
  };

  return (
    <Box>
      <Tabs value={activeTabIndex} onChange={(e, newValue) => dispatch(setActiveTab(newValue))}>
        {tabs.map((tab: TabData) => (
          <Tab
            key={tab.tabId}
            label={
              <span>
                {tab.tabLabel}
                {tab.isRemovableTab && (
                  <IconButton
                    size="small"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRemoveTab(tab.tabId, tab.parentTabId ?? 0);
                    }}
                  >
                    <CloseIcon fontSize="small" />
                  </IconButton>
                )}
              </span>
            }
          />
        ))}
      </Tabs>
      <Box mt={2}>
        {tabs.map((tab: TabData) => (
          <div style={{ margin: "5px" }} key={tab.tabId} hidden={activeTabIndex !== tabs.indexOf(tab)}>
            {renderTabContent(tab)}
          </div>
        ))}
      </Box>
    </Box>
  );
};

export default TabsComponent;