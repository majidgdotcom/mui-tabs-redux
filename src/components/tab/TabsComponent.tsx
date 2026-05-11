import React, { lazy, Suspense } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Tabs, Tab, Box, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { removeTab, setActiveTab } from '../../stateManagement/slices/tabsSlice';
import { RootState } from '../../stateManagement/store';
import { TabData } from '../../interfaces/ITab';

const Customers = lazy(() => import('../customer/Customers'));
const Customer  = lazy(() => import('../customer/Customer'));
const Products  = lazy(() => import('../product/Products'));
const Product   = lazy(() => import('../product/Product'));

const TabsComponent: React.FC = () => {
  const dispatch = useDispatch();
  const { tabs, activeTabId } = useSelector((state: RootState) => state.tabs);

  // MUI Tabs expects a 0-based array index for `value`.
  // We store tabId in state, so derive the visual index here.
  const activeTabIndex = tabs.findIndex((t) => t.tabId === activeTabId);

  const handleTabChange = (_: React.SyntheticEvent, newIndex: number) => {
    // Convert array index back to tabId before storing.
    const tabId = tabs[newIndex]?.tabId;
    if (tabId !== undefined) dispatch(setActiveTab(tabId));
  };

  const handleRemoveTab = (tabId: number, parentTabId: number) => {
    dispatch(removeTab({ tabId, parentTabId }));
  };

  const renderTabContent = (tab: TabData) => {
    switch (tab.tabType) {
      case 'Customers':
        return (
          <Suspense fallback={<div>Loading...</div>}>
            <Customers tabId={tab.tabId} />
          </Suspense>
        );
      case 'Products':
        return (
          <Suspense fallback={<div>Loading...</div>}>
            <Products tabId={tab.tabId} />
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
      <Tabs value={activeTabIndex} onChange={handleTabChange}>
        {tabs.map((tab) => (
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
        {tabs.map((tab) => (
          <div
            key={tab.tabId}
            style={{ margin: '5px' }}
            hidden={tab.tabId !== activeTabId}
          >
            {renderTabContent(tab)}
          </div>
        ))}
      </Box>
    </Box>
  );
};

export default TabsComponent;
