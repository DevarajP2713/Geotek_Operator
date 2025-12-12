import React from "react";
import styles from "./PredrillingForm.module.scss";
import DynamicForm, { DynamicFormProps } from "../DynamicForm/DynamicForm";

const PredrillingForm = (): JSX.Element => {
  const Data: DynamicFormProps = {
    PageTitle: "Predrilling",
    NavigateTitle: "add_drilling",
    FormPageLabels: {
      InputPoint: "Select Input Points",
      Timer: "Timer",
      Depth: "Depth (ft)",
      Diameter: "Diameter (ft)",
      Equipment: "Equipment",
    },
  };
  return (
    <div className={styles.con}>
      <DynamicForm data={Data} />
    </div>
  );
};

export default PredrillingForm;
