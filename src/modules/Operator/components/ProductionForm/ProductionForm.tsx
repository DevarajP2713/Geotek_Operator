import React from "react";
import DynamicForm, { DynamicFormProps } from "../DynamicForm/DynamicForm";

const ProductionForm = (): JSX.Element => {
  const Data: DynamicFormProps = {
    PageTitle: "Production",
    NavigateTitle: "add_production",
    FormPageLabels: {
      InputPoint: "Select Input Points",
      Timer: "Duration",
      Depth: "Depth (ft)",
      Diameter: "Count",
      Equipment: "Equipment",
    },
  };
  return <DynamicForm data={Data} />;
};

export default ProductionForm;
