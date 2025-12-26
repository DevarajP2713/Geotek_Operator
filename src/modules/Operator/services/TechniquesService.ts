/* eslint-disable @typescript-eslint/no-explicit-any */
import { sp } from "@pnp/sp/presets/all";
import { TechniqueQueries } from "../camlQuery/TechniqueQueries";
import { constants } from "../../../config/constants";
import { ErrorLogs } from "../../../shared/utils/ErrorLogs";

export const fetchTechniques = async (projectID: number): Promise<any> => {
  try {
    const list = sp.web.lists.getByTitle(constants.ListName.PM_Techniques);

    const [camlQueryPayload] = TechniqueQueries.getCamlQuery(projectID);

    const response = await list.renderListDataAsStream({
      ViewXml: camlQueryPayload.CamlQuery,
    });
    const rows = response?.Row ?? [];

    const mapped = rows.map((item: any): any => ({
      ID: Number(item?.ID),
      TechniqueName: item?.Technique ? item?.Technique?.[0]?.lookupValue : "",
    }));

    return mapped;
  } catch (err) {
    await ErrorLogs(
      "TechniquesService (fetchTechniques)",
      err instanceof Error ? err.message : String(err),
      `${constants.ListName.PM_Techniques} Read Items`
    );

    console.error("Technique fetch error:", err);
    return [];
  }
};
