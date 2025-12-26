/* eslint-disable @typescript-eslint/explicit-function-return-type */
import SpServices from "../../../shared/Service/SPServices/SpServices";
import { constants } from "../../../config/constants";
import { IDropValue } from "../../../types/Types";
import { ErrorLogs } from "../../../shared/utils/ErrorLogs";

/* eslint-disable @typescript-eslint/no-explicit-any */
export const AddPredrillingData = async (formData: any): Promise<string> => {
  try {
    const toLocalISO = (timeString: string): string => {
      if (!timeString) return "";

      const today = new Date();
      const [h, m, s] = timeString.split(":").map(Number);

      const pad = (n: number) => String(n).padStart(2, "0");

      return `${today.getFullYear()}-${pad(today.getMonth() + 1)}-${pad(
        today.getDate()
      )}T${pad(h)}:${pad(m)}:${pad(s)}`;
    };

    const data = {
      Predrilling: true,
      Number: formData?.selectPoints?.toString() || "",
      ProjectId: formData?.MasterData?.ProjectName?.value || null,
      TechniqueId: formData?.MasterData?.Technique?.value || null,
      EquipmentsId: {
        results: formData.equipment?.map((e: any) => Number(e.value)) || [],
      },
      ShiftDetailId: formData?.MasterData?.Shift?.value || null,

      // Final ISO DateTime without timezone shift
      PredrillingStartTime: toLocalISO(formData?.startTime),
      PredrillingEndTime: toLocalISO(formData?.stopTime),

      PredrillingDuration: formData?.duration || "0",
      PredrillingDepth: formData?.depth?.toString() || "",
      PredrillingDiameter: formData?.count?.toString() || "",
      IsDeleted: false,
    };

    await SpServices.SPAddItem({
      Listname: constants.ListName.PM_PreDrillingData,
      RequestJSON: data,
    });

    if (formData?.equipment?.some((e: IDropValue) => !e.isActive)) {
      const EquipmentIds: number[] = formData?.allEquipments
        ?.filter((e: IDropValue) => e.isActive)
        ?.map((e: IDropValue) => e.value);

      const selectEquipmentsId: number[] = formData?.equipment
        ?.filter((e: IDropValue) => !e.isActive)
        ?.map((e: IDropValue) => e.value);

      const uniqueIds: number[] = [
        ...new Set([...EquipmentIds, ...selectEquipmentsId]),
      ];

      await SpServices.SPUpdateItem({
        Listname: constants.ListName.PM_Techniques,
        RequestJSON: {
          EquipmentsId: { results: uniqueIds },
        },
        ID: Number(formData?.MasterData?.Technique?.value),
      });
    }

    return "Predrilling data has been added successfully.";
  } catch (err) {
    await ErrorLogs(
      "usePredrilling (AddPredrillingData)",
      err instanceof Error ? err.message : String(err),
      `${constants.ListName.PM_PreDrillingData} Add Item`
    );

    console.warn("Add predrilling data error", err);
    return "Add Predrilling failed";
  }
};
