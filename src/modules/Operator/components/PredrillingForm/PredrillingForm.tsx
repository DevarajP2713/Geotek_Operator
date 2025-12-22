import React from "react";
import DynamicForm, { DynamicFormProps } from "../DynamicForm/DynamicForm";

const PredrillingForm = (): JSX.Element => {
  const Data: DynamicFormProps = {
    PageTitle: "Predrilling",
    NavigateTitle: "add_drilling",
    FormPageLabels: {
      InputPoint: "Select Input Points",
      Timer: "Duration",
      Depth: "Depth (ft)",
      Diameter: "Diameter (ft)",
      Equipment: "Equipment",
    },
  };
  return <DynamicForm data={Data} />;
};

export default PredrillingForm;
