import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AddTabData, removeTabAndRefreshData, removeTabData, TabData, TabsState } from '../../interfaces/ITab';

// Helper function to load tabs from localStorage
const loadTabsFromLocalStorage = (): TabData[] => {
  const savedTabs = localStorage.getItem('tabs');
  return savedTabs
    ? JSON.parse(savedTabs)
    :
    // Example default tab list
    [
      { tabId: 0, tabLabel: 'Customers', tabType: 'Customers', isRemovableTab: false },
      { tabId: 1, tabLabel: 'Products', tabType: 'Products', isRemovableTab: false },
    ];
};

const saveTabsToLocalStorage = (tabs: TabData[]) => {
  localStorage.setItem('tabs', JSON.stringify(tabs));
};

const initialState: TabsState = {
  tabs: loadTabsFromLocalStorage(),
  activeTabIndex: 0,
};

export const tabsSlice = createSlice({
  name: 'tabs',
  initialState,
  reducers: {
    addTab: (state, action: PayloadAction<AddTabData>) => {
      const newTabId = Math.max(...state.tabs.map((item: TabData) => item.tabId), 0) + 1;
      state.tabs.push({
        tabId: newTabId,
        tabType: action.payload.tabType,
        tabLabel: action.payload.tabLabel,
        isRemovableTab: action.payload.isRemovableTab,
        entityId: action.payload.entityId,
        parentTabId: action.payload.parentTabId,
        customParameter: action.payload.customParameter,
      });
      state.activeTabIndex = newTabId;
      saveTabsToLocalStorage(state.tabs);
    },
    removeTab: (state, action: PayloadAction<removeTabData>) => {
      state.tabs = state.tabs.filter((tab) => tab.tabId !== action.payload.tabId);
      state.activeTabIndex = action.payload.parentTabId;
      saveTabsToLocalStorage(state.tabs);
    },
    removeTabAndRefresh: (state, action: PayloadAction<removeTabAndRefreshData>) => {
      state.tabs = state.tabs.filter((tab) => tab.tabId !== action.payload.tabId);
      state.activeTabIndex = action.payload.parentTabId;
      state.refreshedTab = action.payload.parentTabId;
      saveTabsToLocalStorage(state.tabs);
    },
    setActiveTab: (state, action: PayloadAction<number>) => {
      state.activeTabIndex = action.payload;
      saveTabsToLocalStorage(state.tabs);
    },
    setRefreshedTab: (state, action: PayloadAction<number | undefined>) => {
      state.refreshedTab = action.payload;
    },
  },
});

export const { addTab, removeTab, setActiveTab, removeTabAndRefresh, setRefreshedTab } = tabsSlice.actions;

export default tabsSlice.reducer;