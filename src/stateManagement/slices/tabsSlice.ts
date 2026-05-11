import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AddTabData, RemoveTabData, TabData, TabsState } from '../../interfaces/ITab';

const loadTabsFromLocalStorage = (): TabData[] => {
  const saved = localStorage.getItem('tabs');
  return saved
    ? JSON.parse(saved)
    : [
        { tabId: 0, tabLabel: 'Customers', tabType: 'Customers', isRemovableTab: false },
        { tabId: 1, tabLabel: 'Products',  tabType: 'Products',  isRemovableTab: false },
      ];
};

const saveTabsToLocalStorage = (tabs: TabData[]) => {
  localStorage.setItem('tabs', JSON.stringify(tabs));
};

const initialState: TabsState = {
  tabs: loadTabsFromLocalStorage(),
  // activeTabId stores the tabId (not array index) of the selected tab,
  // so it stays stable when other tabs are added or removed.
  activeTabId: 0,
};

export const tabsSlice = createSlice({
  name: 'tabs',
  initialState,
  reducers: {
    addTab: (state, action: PayloadAction<AddTabData>) => {
      const newTabId = Math.max(...state.tabs.map((t) => t.tabId), 0) + 1;
      state.tabs.push({
        tabId: newTabId,
        tabType: action.payload.tabType,
        tabLabel: action.payload.tabLabel,
        isRemovableTab: action.payload.isRemovableTab,
        entityId: action.payload.entityId,
        parentTabId: action.payload.parentTabId,
        customParameter: action.payload.customParameter,
      });
      state.activeTabId = newTabId;
      saveTabsToLocalStorage(state.tabs);
    },

    removeTab: (state, action: PayloadAction<RemoveTabData>) => {
      state.tabs = state.tabs.filter((t) => t.tabId !== action.payload.tabId);
      state.activeTabId = action.payload.parentTabId;
      saveTabsToLocalStorage(state.tabs);
    },

    removeTabAndRefresh: (state, action: PayloadAction<RemoveTabData>) => {
      state.tabs = state.tabs.filter((t) => t.tabId !== action.payload.tabId);
      state.activeTabId = action.payload.parentTabId;
      state.refreshedTab = action.payload.parentTabId;
      saveTabsToLocalStorage(state.tabs);
    },

    setActiveTab: (state, action: PayloadAction<number>) => {
      // Receives a tabId — not an array index.
      state.activeTabId = action.payload;
      saveTabsToLocalStorage(state.tabs);
    },

    setRefreshedTab: (state, action: PayloadAction<number | undefined>) => {
      state.refreshedTab = action.payload;
    },
  },
});

export const {
  addTab,
  removeTab,
  setActiveTab,
  removeTabAndRefresh,
  setRefreshedTab,
} = tabsSlice.actions;

export default tabsSlice.reducer;
