import React from "react";
import {
  // useLocation,
  useParams,
} from "react-router-dom";

const ShiftDetails = (): JSX.Element => {
  // const location = useLocation();
  // const arrPaths: string[] = location?.pathname?.split("/") || [];
  // const curIDX: number = Number(
  //   arrPaths?.findIndex((val: string) => val === "projects")
  // );
  // const curID: number = Number(arrPaths?.splice(curIDX + 1, 1));

  // console.log(curID);
  const { project_id, shift_id, shift_type } = useParams();

  console.log("Project ID:", project_id);
  console.log("Shift ID:", shift_id);
  console.log("Shift Type:", shift_type);

  return <div>ShiftDetails</div>;
};

export default ShiftDetails;
