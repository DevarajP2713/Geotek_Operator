/* eslint-disable @typescript-eslint/no-explicit-any */
import { sp } from "@pnp/sp/presets/all";
import { camlQuery } from "../camlQuery/ProjectQueries";

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

export const fetchProjects = async (): Promise<any> => {
  const data: any[] = [];

  try {
    await sp.web.lists
      .getByTitle(camlQuery.Projects.ListName)
      .renderListDataAsStream({
        ViewXml: camlQuery.Projects.CamlQuery,
      })
      .then(async (res: any) => {
        data.push(...res.Row);

        if (res?.NextHref) {
          await fetchDataLooping(
            data,
            res?.NextHref,
            camlQuery.Projects.CamlQuery,
            camlQuery.Projects.ListName
          );
        }
      });

    return [...data];
  } catch (err) {
    console.log("Data fetching error for leads and projects: ", err);
    return [...data];
  }
};
