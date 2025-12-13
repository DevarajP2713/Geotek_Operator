import React from "react";
import styles from "./ProductionForm.module.scss";
import DynamicForm, { DynamicFormProps } from "../DynamicForm/DynamicForm";

const ProductionForm = (): JSX.Element => {
  const Data: DynamicFormProps = {
    PageTitle: "Production",
    NavigateTitle: "add_production",
    FormPageLabels: {
      InputPoint: "Select Input Points",
      Timer: "Timer",
      Depth: "Depth (ft)",
      Diameter: "Count",
      Equipment: "Equipment",
    },
  };
  return (
    <div className={styles.con}>
      <DynamicForm data={Data} />
    </div>
  );
};

export default ProductionForm;
