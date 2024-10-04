import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface TabData {
  tabId: number;
  tabType: string;
  tabLabel: string;
  isRemovableTab: boolean;
  entityId?: number;
  parentTabId?: number,
  closeTab?: () => void;
  customParameter?: any,
}

export interface AddTabData {
  tabType: string;
  tabLabel: string;
  isRemovableTab: boolean;
  entityId?: number;
  parentTabId?: number,
  closeTab?: () => void;
  customParameter?: any,
}

export interface TabsState {
  tabs: TabData[];
  activeTabIndex: number;
}

export interface EntityListTabProps {
  tabId: number;
}

export interface EntityTabProps {
  tabId: number;
  entityId: number;
  parentTabId: number,
  closeEntity: () => void;
  handleRemoveTab: (id: number, parentTabId: number) => void;
  customParameter?: any,
}

// Helper function to load tabs from localStorage
const loadTabsFromLocalStorage = (): TabData[] => {
  const savedTabs = localStorage.getItem('tabs');
  return savedTabs
    ? JSON.parse(savedTabs)
    : [
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
      state.tabs.push({
        tabId: Math.max(...state.tabs.map((item: TabData) => item.tabId), 0) + 1,
        tabType: action.payload.tabType,
        tabLabel: action.payload.tabLabel,
        isRemovableTab: action.payload.isRemovableTab,
        entityId: action.payload.entityId,
        parentTabId: action.payload.parentTabId,
        closeTab: action.payload.closeTab,
        customParameter: action.payload.customParameter,
      });
      state.activeTabIndex = state.tabs.length - 1;
      saveTabsToLocalStorage(state.tabs);
    },
    removeTab: (state, action: PayloadAction<number>) => {
      const idToRemove = action.payload;
      state.tabs = state.tabs.filter((tab) => tab.tabId !== idToRemove);
      state.activeTabIndex = Math.max(0, state.activeTabIndex - 1);
      saveTabsToLocalStorage(state.tabs);
    },
    setActiveTab: (state, action: PayloadAction<number>) => {
      state.activeTabIndex = action.payload;
      saveTabsToLocalStorage(state.tabs);
    },
  },
});

export const { addTab, removeTab, setActiveTab } = tabsSlice.actions;

export default tabsSlice.reducer;