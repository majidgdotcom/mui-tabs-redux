import tabsReducer, {
  addTab,
  removeTab,
  setActiveTab,
  removeTabAndRefresh,
  setRefreshedTab,
} from './tabsSlice';
import { TabsState } from '../../interfaces/ITab';

const initialState: TabsState = {
  tabs: [
    { tabId: 0, tabLabel: 'Customers', tabType: 'Customers', isRemovableTab: false },
    { tabId: 1, tabLabel: 'Products',  tabType: 'Products',  isRemovableTab: false },
  ],
  activeTabId: 0,
};

describe('tabsSlice', () => {
  it('addTab: adds a new tab and makes it active', () => {
    const state = tabsReducer(initialState, addTab({
      tabType: 'Customer',
      tabLabel: 'Edit customer',
      isRemovableTab: true,
      entityId: 5,
      parentTabId: 0,
    }));

    expect(state.tabs).toHaveLength(3);
    expect(state.tabs[2].tabType).toBe('Customer');
    expect(state.tabs[2].entityId).toBe(5);
    // New tab should become active
    expect(state.activeTabId).toBe(state.tabs[2].tabId);
  });

  it('addTab: assigns a unique tabId greater than all existing ones', () => {
    const state = tabsReducer(initialState, addTab({
      tabType: 'Product',
      tabLabel: 'New product',
      isRemovableTab: true,
    }));

    const newTabId = state.tabs[state.tabs.length - 1].tabId;
    const previousMax = Math.max(...initialState.tabs.map((t) => t.tabId));
    expect(newTabId).toBeGreaterThan(previousMax);
  });

  it('removeTab: removes the correct tab and activates the parent', () => {
    // First add a child tab
    const withChild = tabsReducer(initialState, addTab({
      tabType: 'Customer',
      tabLabel: 'Edit customer',
      isRemovableTab: true,
      parentTabId: 0,
    }));
    const childTabId = withChild.tabs[2].tabId;

    const state = tabsReducer(withChild, removeTab({ tabId: childTabId, parentTabId: 0 }));

    expect(state.tabs.find((t) => t.tabId === childTabId)).toBeUndefined();
    expect(state.activeTabId).toBe(0);
  });

  it('removeTab: does not affect other tabs', () => {
    const withChild = tabsReducer(initialState, addTab({
      tabType: 'Customer',
      tabLabel: 'Edit customer',
      isRemovableTab: true,
      parentTabId: 0,
    }));
    const childTabId = withChild.tabs[2].tabId;

    const state = tabsReducer(withChild, removeTab({ tabId: childTabId, parentTabId: 0 }));

    expect(state.tabs).toHaveLength(2);
    expect(state.tabs[0].tabId).toBe(0);
    expect(state.tabs[1].tabId).toBe(1);
  });

  it('removeTabAndRefresh: removes tab and sets refreshedTab', () => {
    const withChild = tabsReducer(initialState, addTab({
      tabType: 'Customer',
      tabLabel: 'Edit customer',
      isRemovableTab: true,
      parentTabId: 0,
    }));
    const childTabId = withChild.tabs[2].tabId;

    const state = tabsReducer(withChild, removeTabAndRefresh({ tabId: childTabId, parentTabId: 0 }));

    expect(state.tabs.find((t) => t.tabId === childTabId)).toBeUndefined();
    expect(state.activeTabId).toBe(0);
    expect(state.refreshedTab).toBe(0);
  });

  it('setActiveTab: updates activeTabId', () => {
    const state = tabsReducer(initialState, setActiveTab(1));
    expect(state.activeTabId).toBe(1);
  });

  it('setRefreshedTab: sets and clears refreshedTab', () => {
    const withRefresh = tabsReducer(initialState, setRefreshedTab(1));
    expect(withRefresh.refreshedTab).toBe(1);

    const cleared = tabsReducer(withRefresh, setRefreshedTab(undefined));
    expect(cleared.refreshedTab).toBeUndefined();
  });
});
