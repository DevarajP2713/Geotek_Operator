/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback, useState } from "react";
import { IShiftDetailsObject } from "../entities/types";
import { ILoaderStatus } from "../../../types/Types";
import { constants } from "../../../config/constants";
import { ShiftQueries } from "../camlQuery/ShiftQueries";
import { fetchPagedListData } from "../../../shared/utils/FeatchPageData";
import dayjs from "dayjs";

const useProjects = (): {
  masterData: IShiftDetailsObject[];
  requestStatus: ILoaderStatus;
  refetch: (projectID: number) => Promise<void>;
} => {
  const [requestStatus, setRequestStatus] = useState<ILoaderStatus>(
    constants.LoaderStatus
  );
  const [masterData, setMasterData] = useState<IShiftDetailsObject[]>([]);

  const updateStatus = (overrides: Partial<ILoaderStatus>): void => {
    setRequestStatus((prev) => ({ ...prev, ...overrides }));
  };

  const refetch = useCallback(async (projectID: number) => {
    updateStatus({
      dataFetching: true,
      isLoading: true,
      message: "Fetching shifts...",
      promiseResolved: false,
    });

    try {
      const query = ShiftQueries.getCamlQuery(projectID);
      const items = await fetchPagedListData({
        ListName: constants.ListName.PM_Production_Shift,
        CamlQuery: query[0].CamlQuery,
      });

      const sanitizedItems: IShiftDetailsObject[] = items.map((item: any) => ({
        ID: Number(item.ID),
        ShiftDate: dayjs(item["ShiftDate."]).format("YYYY-MM-DD"),
        ShiftType: item.ShiftType,
      }));

      setMasterData(sanitizedItems);
      updateStatus({
        dataFetching: false,
        isLoading: false,
        promiseResolved: true,
        message: "Fetched all production shifts!",
      });
    } catch (error: any) {
      updateStatus({
        dataFetching: false,
        isLoading: false,
        errorCode: error?.code || "FETCH_ERROR",
        errorName: error?.name || "FetchError",
        message: error?.message || "Failed to fetch production shifts",
      });
      console.error("Error fetching production shifts:", error);
    }
  }, []);

  return {
    masterData,
    requestStatus,
    refetch,
  };
};

export default useProjects;
