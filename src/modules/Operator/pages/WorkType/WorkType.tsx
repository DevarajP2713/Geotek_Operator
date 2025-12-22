/* eslint-disable @typescript-eslint/no-floating-promises */
import React, { useEffect, useState } from "react";
import styles from "./WorkType.module.scss";
import { Button, Skeleton } from "antd";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { useNavigate, useParams } from "react-router-dom";
import useWorkType from "../../hooks/useWorkType";
import { handleMessages } from "../../../../shared/utils/UserManagementUtils";

const PreDrillingImg = require("../../../../assets/png/preDrilling.png");
const ProductionImg = require("../../../../assets/png/production.png");

const WorkType = (): JSX.Element => {
  const navigate = useNavigate();
  const { project_id, shift_id, shift_type, technique_id } = useParams();
  const { masterData, requestStatus, refetch } = useWorkType();

  const projectId = Number(project_id);
  const shiftId = Number(shift_id);
  const techniqueId = Number(technique_id);
  const [isProductionDisabled, setIsProductionDisabled] =
    useState<boolean>(false);

  const handleBack = (): void => {
    navigate(
      `/projects/${project_id}/shift/${shift_id}/${shift_type}/techniques`
    );
  };

  const handleBackToProjects = (): void => {
    navigate("/projects");
  };

  const handlePreDrilling = (): void => {
    navigate(
      `/projects/${project_id}/shift/${shift_id}/${shift_type}/techniques/${technique_id}/add_drilling`
    );
  };

  const handleProduction = (): void => {
    navigate(
      `/projects/${project_id}/shift/${shift_id}/${shift_type}/techniques/${technique_id}/add_production`
    );
  };

  useEffect(() => {
    refetch(projectId, shiftId, techniqueId);
  }, [projectId, shiftId, techniqueId]);

  useEffect(() => {
    handleMessages(requestStatus);
    setIsProductionDisabled(
      masterData?.Predrilling && !masterData?.PredrillingNumber?.length
    );
  }, [requestStatus]);

  return (
    <div className={styles.con}>
      <div className={styles.header}>
        <div className={styles.headerLeftBox}>
          <KeyboardBackspaceIcon
            style={{ cursor: "pointer" }}
            onClick={handleBack}
          />
          <h1 className={styles.title}>Choose Work Type</h1>
        </div>
        <Button className={styles.homeBtn} onClick={handleBackToProjects}>
          Back to Projects
        </Button>
      </div>

      <div className={styles.body}>
        {requestStatus?.dataFetching ? (
          <>
            {/* Details Skeleton */}
            <div className={styles.detailsBox}>
              {[1, 2, 3].map((_, i) => (
                <div key={i} className={styles.details}>
                  <Skeleton.Input active size="small" style={{ width: 120 }} />
                  <Skeleton.Input
                    active
                    size="default"
                    style={{ width: 200, marginTop: 8 }}
                  />
                </div>
              ))}
            </div>

            {/* Image Skeleton */}
            <div className={styles.imgBox}>
              {[1, 2].map((_, i) => (
                <Skeleton.Image
                  key={i}
                  active
                  style={{ width: 200, height: 160 }}
                />
              ))}
            </div>
          </>
        ) : (
          <>
            {/* Actual Content */}
            <div className={styles.detailsBox}>
              <div className={styles.details}>
                <label>Project No</label>
                <h2 className={styles.content}>
                  {masterData?.ProjectName?.label}
                </h2>
              </div>

              <div className={styles.details}>
                <label>Shift</label>
                <h2 className={styles.content}>{masterData?.Shift?.label}</h2>
              </div>

              <div className={styles.details}>
                <label>Technique</label>
                <h2 className={styles.content}>
                  {masterData?.Technique?.label}
                </h2>
              </div>
            </div>

            <div className={styles.imgBox}>
              {masterData?.Predrilling && (
                <img
                  src={PreDrillingImg}
                  alt="Pre Drilling"
                  onClick={handlePreDrilling}
                />
              )}

              <img
                src={ProductionImg}
                alt="Production"
                style={{
                  filter: isProductionDisabled ? "opacity(0.5)" : "none",
                  cursor: isProductionDisabled ? "not-allowed" : "pointer",
                }}
                onClick={() => {
                  if (!isProductionDisabled) {
                    handleProduction();
                  }
                }}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default WorkType;
