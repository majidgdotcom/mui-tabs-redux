export interface TabData {
  tabId: number;
  tabType: string;
  tabLabel: string;
  isRemovableTab: boolean;
  entityId?: number;
  parentTabId?: number;
  customParameter?: unknown;
}

export interface AddTabData {
  tabType: string;
  tabLabel: string;
  isRemovableTab: boolean;
  entityId?: number;
  parentTabId?: number;
  customParameter?: unknown;
}

// removeTabData and removeTabAndRefreshData were identical — merged into one.
export interface RemoveTabData {
  tabId: number;
  parentTabId: number;
}

export interface TabsState {
  tabs: TabData[];
  // Stores the tabId (not array index) of the currently active tab.
  activeTabId: number;
  refreshedTab?: number;
}

export interface EntityListTabProps {
  tabId: number;
}

export interface EntityTabProps {
  tabId: number;
  entityId: number;
  parentTabId: number;
  customParameter?: unknown;
}
