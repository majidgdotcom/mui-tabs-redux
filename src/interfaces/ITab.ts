export interface TabData {
    tabId: number;
    tabType: string;
    tabLabel: string;
    isRemovableTab: boolean;
    entityId?: number;
    parentTabId?: number,
    customParameter?: any,
  }
  
  export interface AddTabData {
    tabType: string;
    tabLabel: string;
    isRemovableTab: boolean;
    entityId?: number;
    parentTabId?: number,
    customParameter?: any,
  }
  
  export interface removeTabData {
    tabId: number;
    parentTabId: number;
  }
  
  export interface removeTabAndRefreshData {
    tabId: number;
    parentTabId: number;
  }
  
  export interface TabsState {
    tabs: TabData[];
    activeTabIndex: number;
    refreshedTab?: number;
  }
  
  export interface EntityListTabProps {
    tabId: number;
  }
  
  export interface EntityTabProps {
    tabId: number;
    entityId: number;
    parentTabId: number,
    customParameter?: any,
  }