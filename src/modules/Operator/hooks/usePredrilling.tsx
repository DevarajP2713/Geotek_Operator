/* eslint-disable @typescript-eslint/explicit-function-return-type */
import SpServices from "../../../shared/Service/SPServices/SpServices";
import { constants } from "../../../config/constants";

/* eslint-disable @typescript-eslint/no-explicit-any */
export const AddPredrillingData = async (formData: any): Promise<void> => {
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

      PredrillingDuration: formData?.timer?.toString() || "",
      PredrillingDepth: formData?.depth?.toString() || "",
      PredrillingDiameter: formData?.count?.toString() || "",
    };

    await SpServices.SPAddItem({
      Listname: constants.ListName.PM_PreDrillingData,
      RequestJSON: data,
    });
  } catch (error) {
    console.warn("Add predrilling data error", error);
  }
};
