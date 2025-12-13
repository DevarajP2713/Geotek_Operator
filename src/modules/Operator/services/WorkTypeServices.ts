/* eslint-disable @typescript-eslint/no-explicit-any */
// import { sp } from "@pnp/sp/presets/all";
import { camlQuery } from "../camlQuery/ProjectQueries";
import { fetchPagedListData } from "../../../shared/utils/FeatchPageData";
import { constants } from "../../../config/constants";
import { ShiftQueries } from "../camlQuery/ShiftQueries";
import { TechniqueQueries } from "../camlQuery/TechniqueQueries";
import { PMPredrillingQueries } from "../camlQuery/PredrillingQueries";

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
