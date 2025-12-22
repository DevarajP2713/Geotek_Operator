/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback, useState } from "react";
import { IProjectsObject } from "../entities/types";
import { ILoaderStatus } from "../../../types/Types";
import { constants } from "../../../config/constants";
import { fetchProjects } from "../services/projectsService";

const useProjects = (): {
  masterData: IProjectsObject[];
  requestStatus: ILoaderStatus;
  refetch: () => Promise<void>;
} => {
  const [requestStatus, setRequestStatus] = useState<ILoaderStatus>(
    constants.LoaderStatus
  );
  const [masterData, setMasterData] = useState<IProjectsObject[]>([]);

  const updateStatus = (overrides: Partial<ILoaderStatus>): void => {
    setRequestStatus((prev) => ({ ...prev, ...overrides }));
  };

  const refetch = useCallback(async () => {
    try {
      updateStatus({
        requestProcessing: true,
        isLoading: true,
        message: "Processing in progress. Please wait...",
      });

      const arrprojects = await fetchProjects();

      const prepareprojects: IProjectsObject[] = arrprojects.map(
        (item: any) => ({
          ID: Number(item?.ID) || 0,
          Title: item?.Title ?? "",
          Name: item?.Name ?? "",
        })
      );

      setMasterData(prepareprojects);

      updateStatus({
        dataFetching: false,
        requestProcessing: false,
        isLoading: false,
        promiseResolved: true,
        message: "All projects successfully fetched.",
      });
    } catch (error: any) {
      updateStatus({
        dataFetching: false,
        requestProcessing: false,
        isLoading: false,
        promiseResolved: false,
        errorCode: error?.code || "FETCH_ERROR",
        errorName: error?.name || "FetchError",
        message: error?.message || "Failed to fetch projects.",
      });
    }
  }, []);

  return {
    masterData,
    requestStatus,
    refetch,
  };
};

export default useProjects;
