/* eslint-disable @typescript-eslint/no-floating-promises */
import React, { useEffect, useState } from "react";
import styles from "./WorkType.module.scss";
import { Button } from "antd";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { useNavigate, useParams } from "react-router-dom";
import useWorkType from "../../hooks/useWorkType";
import { IWorkTypeDetailsObject } from "../../entities/types";

const PreDrillingImg: string = require("../../../../assets/png/preDrilling.png");
const ProductionImg: string = require("../../../../assets/png/production.png");

const WorkType = (): JSX.Element => {
  /* local varaiables creation start */
  const navigate = useNavigate();
  const { masterData, requestStatus, refetch } = useWorkType();
  const { project_id, shift_id, shift_type, technique_id } = useParams();

  // States
  const [masWorkTypeData, setMasWorkTypeData] =
    useState<IWorkTypeDetailsObject>();

  useEffect(() => {
    refetch(Number(project_id), Number(shift_id), Number(technique_id));
  }, []);

  useEffect(() => {
    setMasWorkTypeData(masterData);
  }, [requestStatus]);
  return (
    <div className={styles.con}>
      <div className={styles.header}>
        <div className={styles.headerLeftBox}>
          <KeyboardBackspaceIcon
            style={{ cursor: "pointer" }}
            onClick={() =>
              navigate(
                `/projects/${project_id}/shift/${shift_id}/${shift_type}/techniques`
              )
            }
          />
          <h1 className={styles.title}>Choose Work Type</h1>
        </div>
        <Button
          className={styles.homeBtn}
          onClick={() => {
            navigate("/projects");
          }}
        >
          Back to Projects
        </Button>
      </div>
      <div className={styles.body}>
        <div className={styles.detailsBox}>
          <div className={styles.details}>
            <label>Project Name</label>
            <h2 className={styles.content}>
              {masWorkTypeData?.ProjectName?.label || ""}
            </h2>
          </div>
          <div className={styles.details}>
            <label>Shift</label>
            <h2 className={styles.content}>
              {masWorkTypeData?.Shift?.label || ""}
            </h2>
          </div>
          <div className={styles.details}>
            <label>Technique</label>
            <h2 className={styles.content}>
              {masWorkTypeData?.Technique?.label || ""}
            </h2>
          </div>
        </div>
        <div className={styles.imgBox}>
          {masWorkTypeData?.Predrilling ? (
            <img
              src={PreDrillingImg}
              alt="No img"
              onClick={() => {
                navigate(
                  `/projects/${project_id}/shift/${shift_id}/${shift_type}/techniques/${technique_id}/add_drilling`
                );
              }}
            />
          ) : (
            ""
          )}
          <img
            src={ProductionImg}
            alt="No img"
            style={{
              filter: !(
                masWorkTypeData?.Predrilling &&
                masWorkTypeData?.PredrillingNumber?.length
              )
                ? "opacity(0.5)"
                : "none",
            }}
            onClick={() => {
              if (
                masWorkTypeData?.Predrilling &&
                masWorkTypeData?.PredrillingNumber?.length
              ) {
                navigate(
                  `/projects/${project_id}/shift/${shift_id}/${shift_type}/techniques/${technique_id}/add_production`
                );
              }
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default WorkType;
