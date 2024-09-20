import React, { lazy, Suspense, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Tabs, Tab, Box, IconButton } from '@mui/material';  // Latest Material-UI
import CloseIcon from '@mui/icons-material/Close';  // Latest Material-UI icons
import { addTab, removeTab, setActiveTab, TabData } from '../../stateManagement/tabsSlice'

const Customers = lazy(() => import('../customer/Customers'));  // Lazy load Customers component
const Customer = lazy(() => import('../customer/Customer'));    // Lazy load Customer component
const Products = lazy(() => import('../product/Products'));    // Lazy load Products component
const Product = lazy(() => import('../product/Product'));    // Lazy load Products component


const TabsComponent: React.FC = () => {
  const dispatch = useDispatch();
  const { tabs, activeTabIndex } = useSelector((state: any) => state.tabs);

  const [lastListTab, setLastListTab] = useState(0);

  const handleRemoveTab = (tabIdd: number, listTabId: number) => {
    dispatch(removeTab(tabIdd));
    dispatch(setActiveTab(listTabId ?? 0));
  };

  const openEntityTab = (tabType: string, entityId: number, entityTitle: string, listTabId: number, closeTab: () => void, customParameter?: any) => {
    setLastListTab(listTabId)
    dispatch(
      addTab({
        tabId: Math.max(...tabs.map((item: TabData) => item.tabId), 0) + 1,
        tabLabel: `${(entityId > 0 ? `${tabType} Edit` : `New ${tabType}`)}`,
        tabType: tabType,
        isRemovableTab: true,
        entityId: entityId,
        entityTitle: entityTitle,
        listTabId: listTabId,
        closeTab: closeTab,
        customParameter: customParameter,
      })
    );
  };

  const renderTabContent = (tab: TabData) => {
    switch (tab.tabType) {
      case 'Customers':
        return (
          <Suspense fallback={<div>Loading...</div>}>
            <Customers
              tabId={tab.tabId}
              openEntity={openEntityTab}
            />
          </Suspense>
        );
      case 'Products':
        return (
          <Suspense fallback={<div>Loading...</div>}>
            <Products
              tabId={tab.tabId}
              openEntity={openEntityTab}
            />
          </Suspense>
        );
      case 'Customer':
        return (
          <Suspense fallback={<div>Loading...</div>}>
            <Customer
              tabId={tab.tabId}
              entityId={tab.entityId!}
              entityTitle={tab.entityTitle!}
              closeEntity={tab.closeTab!}
              handleRemoveTab={handleRemoveTab}
              listTabId={tab.listTabId!}
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
              entityTitle={tab.entityTitle!}
              closeEntity={tab.closeTab!}
              handleRemoveTab={handleRemoveTab}
              listTabId={tab.listTabId!}
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
                      handleRemoveTab(tab.tabId, lastListTab);
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
          <div style={{ margin: "5px" }} key={tab.tabId} hidden={activeTabIndex !== tab.tabId}>
            {renderTabContent(tab)}
          </div>
        ))}
      </Box>
    </Box>
  );
};

export default TabsComponent;