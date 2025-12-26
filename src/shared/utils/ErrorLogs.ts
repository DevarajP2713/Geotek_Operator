// /* eslint-disable @typescript-eslint/no-floating-promises */
import { constants } from "../../config/constants";
import SpServices from "../Service/SPServices/SpServices";

export const ErrorLogs = async (
  ComponentName: string,
  Error: string,
  ListDetails: string
): Promise<void> => {
  await SpServices.SPAddItem({
    Listname: constants.ListName.Error_Logs,
    RequestJSON: {
      AppName: "Operator Portal",
      ComponentName: ComponentName,
      Comments: Error,
      ListDetails: ListDetails,
    },
  });
};
