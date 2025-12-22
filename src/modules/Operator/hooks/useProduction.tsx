/* eslint-disable @typescript-eslint/explicit-function-return-type */
import SpServices from "../../../shared/Service/SPServices/SpServices";
import { constants } from "../../../config/constants";
import { IDropValue } from "../../../types/Types";

/* eslint-disable @typescript-eslint/no-explicit-any */
export const AddProductionData = async (formData: any): Promise<string> => {
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
      //   Predrilling: true,
      PredrillingDetailsId: formData?.selectPointPredrilling?.value
        ? formData?.selectPointPredrilling?.value
        : null,
      Number: formData?.selectPointPredrilling?.value
        ? formData?.selectPointPredrilling?.label?.toString()
        : formData?.selectPoints?.toString() || "",

      ProjectId: formData?.MasterData?.ProjectName?.value || null,
      TechniqueId: formData?.MasterData?.Technique?.value || null,
      EquipmentsId: {
        results: formData.equipment?.map((e: any) => Number(e.value)) || [],
      },
      ShiftDetailId: formData?.MasterData?.Shift?.value || null,

      // Final ISO DateTime without timezone shift
      ProductionStartTime: toLocalISO(formData?.startTime),
      ProductionEndTime: toLocalISO(formData?.stopTime),

      ProductionDuration: formData?.duration || "0",
      ProductionDepth: formData?.depth?.toString() || "",
      Count: formData?.count?.toString() || "",

      TotalQuantity: formData?.calculateTotalQuantity.toString() || "",
      AverageDiameter: formData?.calculateDiameter.toString() || "",
      IsDeleted: false,
    };

    await SpServices.SPAddItem({
      Listname: constants.ListName.PM_ProductionData,
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

    return "Added Production data successfully";
  } catch (error) {
    console.warn("Add production data error", error);
    return "Add Production failed";
  }
};
