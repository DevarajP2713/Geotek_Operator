/* eslint-disable @typescript-eslint/no-explicit-any */
import { sp } from "@pnp/sp/presets/all";

export interface SPQueryParams {
  ListName: string;
  CamlQuery: any;
}

export const fetchPagedListData = async (
  queryParams: SPQueryParams
): Promise<any[]> => {
  const data: any[] = [];

  const fetchData = async (nextHref?: string): Promise<void> => {
    try {
      const res = nextHref
        ? await sp.web.lists
            .getByTitle(queryParams.ListName)
            .renderListDataAsStream(queryParams.CamlQuery, nextHref)
        : await sp.web.lists
            .getByTitle(queryParams.ListName)
            .renderListDataAsStream({
              ViewXml: queryParams.CamlQuery,
            });

      data.push(...res.Row);

      if (res.NextHref) {
        await fetchData(res.NextHref);
      }
    } catch (error) {
      console.error(
        `Error fetching data from list '${queryParams.ListName}':`,
        error
      );
    }
  };

  await fetchData();

  return [...data];
};
