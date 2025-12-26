/* eslint-disable @typescript-eslint/no-explicit-any */
import { sp } from "@pnp/sp/presets/all";
import { camlQuery } from "../camlQuery/ProjectQueries";
import { ErrorLogs } from "../../../shared/utils/ErrorLogs";

const fetchDataLooping = async (
  data: any[],
  nextRef: any,
  curQuery: string,
  ListName: string
): Promise<any[]> => {
  try {
    await sp.web.lists
      .getByTitle(ListName)
      .renderListDataAsStream({
        ViewXml: curQuery,
        Paging: nextRef.substring(1),
      })
      .then(async (res: any) => {
        data.push(...res.Row);

        if (res.NextHref) {
          await fetchDataLooping(data, res.NextHref, curQuery, ListName);
        }
      });

    return [...data];
  } catch (err) {
    console.log("Looping datas fetching error for leads and projects: ", err);
    return [...data];
  }
};

export const fetchProjects = async (): Promise<any[]> => {
  const data: any[] = [];
  const projectQuery = camlQuery.Projects()[0];

  try {
    const res: any = await sp.web.lists
      .getByTitle(projectQuery.ListName)
      .renderListDataAsStream({
        ViewXml: projectQuery.CamlQuery,
      });

    if (res?.Row?.length) {
      data.push(...res.Row);
    }

    if (res?.NextHref) {
      await fetchDataLooping(
        data,
        res.NextHref,
        projectQuery.CamlQuery,
        projectQuery.ListName
      );
    }

    return data;
  } catch (err) {
    await ErrorLogs(
      "projectsService (fetchProjects)",
      err instanceof Error ? err.message : String(err),
      `${projectQuery.ListName} Read Items`
    );

    console.error("Data fetching error for leads and projects:", err);
    return data;
  }
};
