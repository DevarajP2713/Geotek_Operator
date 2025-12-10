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
    updateStatus({
      requestProcessing: true,
      isLoading: true,
      message: "Processing in progress. Please wait...",
    });

    const [arrprojects] = await Promise.all([fetchProjects()]);

    const prepareprojects: IProjectsObject[] =
      arrprojects?.map((item: any) => {
        return {
          ID: item?.ID ? Number(item?.ID) : "",
          Title: item?.Title ?? "",
          Name: item?.Name ?? "",
        };
      }) || [];

    await Promise.all(prepareprojects);
    setMasterData(prepareprojects);
    if (arrprojects?.length || arrprojects?.length === 0) {
      updateStatus({
        dataFetching: false,
        requestProcessing: false,
        isLoading: false,
        promiseResolved: true,
        message: "All projects type successfully fetched.",
      });
    } else {
      updateStatus({
        dataFetching: false,
        isLoading: false,
        errorCode: arrprojects?.code || "FETCH_ERROR",
        errorName: arrprojects?.name || "FetchError",
        message: arrprojects?.message || "Failed to fetch project type.",
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
