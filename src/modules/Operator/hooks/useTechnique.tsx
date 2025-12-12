/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback, useState } from "react";
import { ITechniquesObject } from "../entities/types";
import { ILoaderStatus } from "../../../types/Types";
import { constants } from "../../../config/constants";
import { fetchTechniques } from "../services/TechniquesService";

const useTechnique = (): {
  masterData: ITechniquesObject[];
  requestStatus: ILoaderStatus;
  refetch: (projectID: number) => Promise<void>;
} => {
  const [requestStatus, setRequestStatus] = useState<ILoaderStatus>(
    constants.LoaderStatus
  );
  const [masterData, setMasterData] = useState<ITechniquesObject[]>([]);

  const updateStatus = (overrides: Partial<ILoaderStatus>): void => {
    setRequestStatus((prev) => ({ ...prev, ...overrides }));
  };

  const refetch = useCallback(async (projectID: number) => {
    updateStatus({
      requestProcessing: true,
      isLoading: true,
      message: "Processing in progress. Please wait...",
    });

    const [arrTechniques] = await Promise.all([fetchTechniques(projectID)]);

    setMasterData(arrTechniques);
    if (arrTechniques?.length || arrTechniques?.length === 0) {
      updateStatus({
        dataFetching: false,
        requestProcessing: false,
        isLoading: false,
        promiseResolved: true,
        message: "All Techniques type successfully fetched.",
      });
    } else {
      updateStatus({
        dataFetching: false,
        isLoading: false,
        errorCode: arrTechniques?.code || "FETCH_ERROR",
        errorName: arrTechniques?.name || "FetchError",
        message: arrTechniques?.message || "Failed to fetch Technique type.",
      });
    }
  }, []);

  return {
    masterData,
    requestStatus,
    refetch,
  };
};

export default useTechnique;
