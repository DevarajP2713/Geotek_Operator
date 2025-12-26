/* eslint-disable @typescript-eslint/no-explicit-any */
// import { sp } from "@pnp/sp/presets/all";
import { camlQuery } from "../camlQuery/ProjectQueries";
import { fetchPagedListData } from "../../../shared/utils/FeatchPageData";
import { constants } from "../../../config/constants";
import { ShiftQueries } from "../camlQuery/ShiftQueries";
import { TechniqueQueries } from "../camlQuery/TechniqueQueries";
import { PMPredrillingQueries } from "../camlQuery/PredrillingQueries";
import SpServices from "../../../shared/Service/SPServices/SpServices";
import { ErrorLogs } from "../../../shared/utils/ErrorLogs";
// import { PMProductionQueries } from "../camlQuery/ProductionQueries";

export const fetchProject = async (ProjectID: number): Promise<any> => {
  try {
    const query = camlQuery.getProjectCamlQuery(ProjectID);
    const items = await fetchPagedListData({
      ListName: constants.ListName.PM_Projects,
      CamlQuery: query[0].CamlQuery,
    });

    return items;
  } catch (err) {
    await ErrorLogs(
      "WorkTypeServices (fetchProject)",
      err instanceof Error ? err.message : String(err),
      `${constants.ListName.PM_Projects} Read Items`
    );

    console.error("Project fetch error:", err);
    return [];
  }
};

export const fetchShift = async (ShiftID: number): Promise<any> => {
  try {
    const query = ShiftQueries.getShiftCamlQuery(ShiftID);
    const items = await fetchPagedListData({
      ListName: constants.ListName.PM_Production_Shift,
      CamlQuery: query[0].CamlQuery,
    });

    return items;
  } catch (err) {
    await ErrorLogs(
      "WorkTypeServices (fetchShift)",
      err instanceof Error ? err.message : String(err),
      `${constants.ListName.PM_Production_Shift} Read Items`
    );

    console.error("Production shift fetch error:", err);
    return [];
  }
};

export const FetchEquimpments = async (ProjectID: number): Promise<any> => {
  try {
    const res: any[] = await SpServices.SPReadItems({
      Listname: constants.ListName.AllEquipments,
      Select:
        "*, EquipmentType/ID, EquipmentType/Name, Project/ID, Project/Name, Vendor/ID, Vendor/VendorName, Author/Title, Author/EMail, Author/ID, AssignedTo/Title, AssignedTo/EMail, AssignedTo/ID",
      Expand: "EquipmentType, Project, Vendor, Author, AssignedTo",
      Filter: [
        {
          FilterKey: "ProjectId",
          Operator: "eq",
          FilterValue: ProjectID,
        },
      ],
      Topcount: 5000,
      Orderby: "Created",
      Orderbydecorasc: false,
    });

    return res;
  } catch (err) {
    await ErrorLogs(
      "WorkTypeServices (FetchEquimpments)",
      err instanceof Error ? err.message : String(err),
      `${constants.ListName.AllEquipments} Read Items`
    );

    console.error("Error fetching Equimpments:", err);
    return null;
  }
};

export const fetchTechnique = async (TechniqueID: number): Promise<any> => {
  try {
    const query = TechniqueQueries.getTechniqueCamlQuery(TechniqueID);
    const items = await fetchPagedListData({
      ListName: constants.ListName.PM_Techniques,
      CamlQuery: query[0].CamlQuery,
    });

    return items;
  } catch (err) {
    await ErrorLogs(
      "WorkTypeServices (fetchTechnique)",
      err instanceof Error ? err.message : String(err),
      `${constants.ListName.PM_Techniques} Read Items`
    );

    console.error("Technique fetch error:", err);
    return [];
  }
};

export const fetchPredrilling = async (
  ProjectID: number,
  ShiftID: number,
  TechniqueID: number
): Promise<any> => {
  try {
    const query = PMPredrillingQueries.getCamlQuery(
      ProjectID,
      ShiftID,
      TechniqueID
    );
    const items = await fetchPagedListData({
      ListName: constants.ListName.PM_PreDrillingData,
      CamlQuery: query[0].CamlQuery,
    });

    return items;
  } catch (err) {
    await ErrorLogs(
      "WorkTypeServices (fetchPredrilling)",
      err instanceof Error ? err.message : String(err),
      `${constants.ListName.PM_PreDrillingData} Read Items`
    );

    console.error("Predrilling fetch error:", err);
    return [];
  }
};

// export const fetchProduction = async (
//   ProjectID: number,
//   ShiftID: number,
//   TechniqueID: number
// ): Promise<any> => {
//   try {
//     const query = PMProductionQueries.getCamlQuery(
//       ProjectID,
//       ShiftID,
//       TechniqueID
//     );
//     const items = await fetchPagedListData({
//       ListName: constants.ListName.PM_ProductionData,
//       CamlQuery: query[0].CamlQuery,
//     });

//     return items;
//   } catch (error) {
//     console.error("Production fetch error:", error);
//     return [];
//   }
// };
