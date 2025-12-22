/* eslint-disable @typescript-eslint/no-explicit-any */
// import { sp } from "@pnp/sp/presets/all";
import { camlQuery } from "../camlQuery/ProjectQueries";
import { fetchPagedListData } from "../../../shared/utils/FeatchPageData";
import { constants } from "../../../config/constants";
import { ShiftQueries } from "../camlQuery/ShiftQueries";
import { TechniqueQueries } from "../camlQuery/TechniqueQueries";
import { PMPredrillingQueries } from "../camlQuery/PredrillingQueries";
import SpServices from "../../../shared/Service/SPServices/SpServices";
// import { PMProductionQueries } from "../camlQuery/ProductionQueries";

export const fetchProject = async (ProjectID: number): Promise<any> => {
  try {
    const query = camlQuery.getProjectCamlQuery(ProjectID);
    const items = await fetchPagedListData({
      ListName: constants.ListName.PM_Projects,
      CamlQuery: query[0].CamlQuery,
    });

    return items;
  } catch (error) {
    console.error("Project fetch error:", error);
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
  } catch (error) {
    console.error("Production shift fetch error:", error);
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
  } catch (error) {
    console.error("Technique fetch error:", error);
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
  } catch (error) {
    console.error("Predrilling fetch error:", error);
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
