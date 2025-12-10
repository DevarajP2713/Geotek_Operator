/* eslint-disable @rushstack/no-new-null */
/* eslint-disable @typescript-eslint/no-explicit-any */

export interface ITenantDetail {
  webURL: string;
  tenantURL: string;
}

export interface IListName {
  PM_UniqueIDsForTheAnnualTeam: string;
  All_Operators: string;
  PM_Opportunities: string;
  PM_Projects: string;
  PM_LeadsAndOpportunities: string;
  UM_UserDetails: string;
  AvailableLicenses: string;
  VM_Details: string;
  VM_Members: string;
  UM_Certifications: string;
  UM_AllUsers: string;
  PM_Production_Shift: string;
  Set_Unit_Of_Measures: string;
  Set_Material: string;
  Set_Downtime_Reason: string;
  Set_Production_Unit: string;
  Set_Equipment_Type: string;
  PM_Timesheet: string;
  PM_Equipment: string;
  AllEquipments: string;
  PM_MaterialDelivered: string;
  All_Vendors: string;
  PM_Downtime: string;
  Set_Equipment_Type_Library: string;
  All_Customers: string;
  Common_Datas: string;
  PM_Notes: string;
  Set_Market_Segment: string;
  Set_Project_Status: string;
  Set_Sales_Category: string;
  Set_Pricing_Level: string;
  Set_Lost_Reason: string;
  Set_Competitors: string;
  Set_Engineering_Status: string;
  PM_Gallery: string;
  PM_Weather: string;
  Set_Customer_Type: string;
  Set_Vendor_Type: string;
  Set_Certification_Type: string;
  Set_Departments: string;
  PM_Techniques: string;
  PM_PreDrillingData: string;
  PM_ProductionData: string;
  Contacts: string;
  Customers_Library: string;
  Set_Industry: string;
  Vendors_Library: string;
  PM_Literature: string;
  All_Equipments_Library: string;
  Eq_Maintenance_History: string;
  Inventory: string;
  Set_Offices: string;
  Set_Occupation: string;
  Org_details: string;
  Set_Category: string;
  Set_MaintenanceType: string;
  Set_Region: string;
}

export interface OperatorRoutesProps {
  routeName: string;
  routePath?: string | any;
  Component: any;
  indexRoute?: boolean;
  individualRoute?: boolean;
  hasChildren: boolean;
  children: OperatorRoutesProps[];
}

export interface ICountryLists {
  name: string;
  code: string;
}

export interface IDropValue {
  value: string | number | null;
  label: string;
  isActive?: boolean;
}

export interface IRoleNames {
  President: string;
  DepartmentManager: string;
  AreaManager: string;
  SeniorProjectManager: string;
  ProjectManager: string;
  AssistantProjectManager: string;
  ProjectEngineer: string;
  Superintedent: string;
  Foreman: string;
  ChiefEngineer: string;
  SeniorDesignEngineer: string;
  DesignEngineer: string;
  CadSpecialist: string;
  SafetyManager: string;
  Controller: string;
  Bookkeeper: string;
  HRManager: string;
  AdminAssistant: string;
  OperationsManager: string;
  ProcurementManager: string;
  MarketingCoordinator: string;
}

export interface ICamlQuery {
  ListName: string;
  CamlQuery: string;
}

export interface ILoaderStatus {
  requestProcessing?: boolean;
  dataFetching?: boolean;
  message: string;
  promiseResolved: boolean;
  isLoading: boolean;
  errorCode?: string;
  errorName?: string;
}
