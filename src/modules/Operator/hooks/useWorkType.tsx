/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback, useState } from "react";
import { IWorkTypeDetailsObject } from "../entities/types";
import { IDropValue, ILoaderStatus } from "../../../types/Types";
import { constants } from "../../../config/constants";
// import { fetchProjects } from "../services/projectsService";
import {
  // FetchEquimpments,
  fetchPredrilling,
  fetchProject,
  fetchShift,
  fetchTechnique,
} from "../services/WorkTypeServices";
import { TechniqueQueries } from "../camlQuery/TechniqueQueries";
import { sp } from "@pnp/sp/presets/all";

const useWorkType = (): {
  masterData: IWorkTypeDetailsObject;
  equipmentChoices: IDropValue[];
  calibrationValue: string;
  requestStatus: ILoaderStatus;
  refetch: (
    projectID: number,
    ShiftID: number,
    TechniqueID: number
  ) => Promise<void>;
  fetchTechniques: (projectID: number, TechniqueID: number) => Promise<void>;
} => {
  const [requestStatus, setRequestStatus] = useState<ILoaderStatus>(
    constants.LoaderStatus
  );
  const [masterData, setMasterData] = useState<IWorkTypeDetailsObject>(Object);
  const [equipmentChoices, setEquipmentChoices] = useState<IDropValue[]>([]);
  const [calibrationValue, setCalibrationValue] = useState<string>("");

  const updateStatus = (overrides: Partial<ILoaderStatus>): void => {
    setRequestStatus((prev) => ({ ...prev, ...overrides }));
  };

  const refetch = useCallback(
    async (projectID: number, ShiftID: number, TechniqueID: number) => {
      updateStatus({
        requestProcessing: true,
        isLoading: true,
        message: "Processing in progress. Please wait...",
      });

      const [arrProject, arrShift, arrTechnique, arrPredrilling] =
        await Promise.all([
          fetchProject(projectID),
          fetchShift(ShiftID),
          fetchTechnique(TechniqueID),
          fetchPredrilling(projectID, ShiftID, TechniqueID),
        ]);

      setMasterData({
        ID: null,
        ProjectName: arrProject?.length
          ? {
              value: Number(arrProject[0]?.ID),
              label: arrProject[0]?.Title,
              isActive: true,
            }
          : null,
        Shift: arrShift?.length
          ? {
              value: Number(arrShift[0]?.ID),
              label: `${arrShift[0]?.ShiftDate} - ${arrShift[0]?.ShiftType}`,
              isActive: true,
            }
          : null,
        Technique: arrTechnique?.length
          ? {
              value: arrTechnique[0]?.ID,
              label: arrTechnique[0]?.Technique[0]?.lookupValue,
              isActive: true,
            }
          : null,
        Predrilling: arrTechnique?.length
          ? arrTechnique[0]?.Predrilling === "No"
            ? false
            : true
          : false,
        PredrillingNumber: arrPredrilling?.length
          ? arrPredrilling?.map((e: any) => ({
              value: Number(e.ID),
              label: e.Number,
              isActive: true,
            }))
          : [],
      });
      if (arrProject?.length || arrProject?.length === 0) {
        updateStatus({
          dataFetching: false,
          requestProcessing: false,
          isLoading: false,
          promiseResolved: true,
          message: "Work type successfully fetched.",
        });
      } else {
        updateStatus({
          dataFetching: false,
          isLoading: false,
          errorCode: arrProject?.code || "FETCH_ERROR",
          errorName: arrProject?.name || "FetchError",
          message: arrProject?.message || "Failed to fetch work type.",
        });
      }
    },
    []
  );

  const fetchTechniques = useCallback(
    async (
      projectID: number,
      // shiftId: number,
      TechniqueId: number
    ): Promise<void> => {
      updateStatus({
        dataFetching: true,
        isLoading: true,
        message: "Fetching techniques...",
        promiseResolved: false,
      });

      try {
        const list = sp.web.lists.getByTitle(constants.ListName.PM_Techniques);

        const [camlQueryPayload] =
          TechniqueQueries.getTechniquesProjectAndTechniqueWiseCamlQuery(
            projectID,
            TechniqueId
          );

        const [
          response,
          // , equipments
        ] = await Promise.all([
          list.renderListDataAsStream({
            ViewXml: camlQueryPayload.CamlQuery,
          }),
          // fetchPredrilling(projectID, shiftId, TechniqueId),
          // fetchProduction(projectID, shiftId, TechniqueId),
          // FetchEquimpments(projectID),
        ]);
        const rows = response?.Row ?? [];

        // const equipmentMapped: IDropValue[] = equipments?.map((item: any) => ({
        //   value: item?.ID,
        //   label: item?.EquipmentID,
        //   isActive: false,
        // }));

        const mapped: IDropValue[] = rows[0]?.Equipments?.map((item: any) => ({
          value: item?.lookupId,
          label: item?.lookupValue,
          isActive: true,
        }));

        // const uniqueEquipments = Array.from(
        //   new Map(
        //     [
        //       // ...equipmentMapped,
        //       ...mapped.map((i) => ({ ...i, isActive: true })),
        //     ].map((i) => [i.value, i])
        //   ).values()
        // );

        setCalibrationValue(rows[0]?.CalibrationValue || "");
        setEquipmentChoices(mapped);
        updateStatus({
          dataFetching: false,
          isLoading: false,
          message: "Techniques fetched",
          promiseResolved: true,
        });
      } catch (error) {
        updateStatus({
          dataFetching: false,
          isLoading: false,
          requestProcessing: false,
          message: `Error: ${
            error instanceof Error ? error.message : String(error)
          }`,
          promiseResolved: false,
        });
      }
    },
    []
  );

  return {
    masterData,
    equipmentChoices,
    calibrationValue,
    requestStatus,
    refetch,
    fetchTechniques,
  };
};

export default useWorkType;
