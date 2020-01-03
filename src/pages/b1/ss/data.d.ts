export interface IVisitData {
  x: string;
  y: number;
}

export interface ISearchData {
  index: number;
  keyword: string;
  count: number;
  range: number;
  status: number;
}

export interface IOfflineData {
  name: string;
  cvr: number;
}

export interface IOfflineChartData {
  x: any;
  y1: number;
  y2: number;
}

export interface IPerformanceData {
  visitData: IVisitData[];
  visitData2: IVisitData[];
  salesData: IVisitData[];
  searchData: ISearchData[];
  offlineData: IOfflineData[];
  offlineChartData: IOfflineChartData[];
  salesTypeData: IVisitData[];
  salesTypeDataOnline: IVisitData[];
  salesTypeDataOffline: IVisitData[];
}
