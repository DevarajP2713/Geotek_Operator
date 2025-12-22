/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-floating-promises */
import React, { useEffect, useState } from "react";
import styles from "./Preview.module.scss";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Button, message } from "antd";
import { AddPredrillingData } from "../../hooks/usePredrilling";
import { AddProductionData } from "../../hooks/useProduction";
import { IWorkTypeDetailsObject } from "../../entities/types";
import { IDropValue } from "../../../../types/Types";
// import { handleMessages } from "../../../../shared/utils/UserManagementUtils";

// Interfaces
interface IPreviewFormData {
  WorkType?: "Predrilling" | "Production";
  MasterData?: IWorkTypeDetailsObject;

  selectPointPredrilling?: IDropValue;
  selectPoints?: string;

  startTime?: string;
  stopTime?: string;
  tempFormatTimeHrMinSec?: string;

  depth?: string | number;
  count?: string | number;

  calculateDiameter?: string | number;
  calculateTotalQuantity?: string | number;

  equipment?: IDropValue[];
}

interface PreviewItemProps {
  label: string;
  value?: string | number;
}

const Preview = (): JSX.Element => {
  const navigate = useNavigate();
  const { project_id, shift_id, shift_type, technique_id } = useParams();

  const location = useLocation();
  const formData = (location.state || {}) as IPreviewFormData;
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const parseDurationToSeconds = (duration?: string): number => {
    if (!duration) return 0;

    const hr = Number(duration.match(/(\d+)\s*hr/)?.[1] ?? 0);
    const min = Number(duration.match(/(\d+)\s*min/)?.[1] ?? 0);
    const sec = Number(duration.match(/(\d+)\s*sec/)?.[1] ?? 0);

    return hr * 3600 + min * 60 + sec;
  };

  const handleBack = (): void => {
    const dur: any = formData?.tempFormatTimeHrMinSec;
    const tempFormatTime = parseDurationToSeconds(dur);

    navigate(
      `/projects/${project_id}/shift/${shift_id}/${shift_type}/techniques/${technique_id}/${
        formData.WorkType === "Predrilling" ? "add_drilling" : "add_production"
      }`,
      {
        state: {
          ...formData,
          duration: tempFormatTime,
        },
      }
    );
  };

  const handleSubmit = async (): Promise<void> => {
    try {
      setIsLoading(true);
      let messageValue: string = "";

      if (formData.WorkType === "Predrilling") {
        const addPrdillingMessage: string = await AddPredrillingData({
          ...formData,
          duration: formData?.tempFormatTimeHrMinSec,
        });
        messageValue = addPrdillingMessage;
      } else {
        const addProductionMessage: string = await AddProductionData({
          ...formData,
          duration: formData?.tempFormatTimeHrMinSec,
        });
        messageValue = addProductionMessage;
      }

      // ✅ SHOW SUCCESS MESSAGE FIRST
      await message.success(messageValue, 1);

      navigate(
        `/projects/${project_id}/shift/${shift_id}/${shift_type}/techniques/${technique_id}`
      );
    } catch (error) {
      console.error("Submit failed", error);
      message.error("Invalid property, Please recheck", 3);
    }
  };

  const PreviewItem = ({ label, value }: PreviewItemProps): JSX.Element => (
    <div className={styles.details}>
      <label>{label}</label>
      <h2 className={styles.content}>{value ?? ""}</h2>
    </div>
  );

  useEffect(() => {
    setIsLoading(false);
  }, []);

  return (
    <div className={styles.con}>
      <div className={styles.header}>
        <div className={styles.headerLeftBox}>
          <KeyboardBackspaceIcon
            style={{ cursor: "pointer" }}
            onClick={handleBack}
          />
          <h1 className={styles.title}>Preview</h1>
        </div>

        <Button
          className={styles.previewBtn}
          disabled={isLoading}
          onClick={() => {
            if (!isLoading) {
              handleSubmit();
            }
          }}
        >
          Submit
        </Button>
      </div>

      <div className={styles.body}>
        <div className={styles.previewPageBox}>
          {/* Project Details */}
          <div className={styles.detailsBox}>
            <PreviewItem
              label="Project Name"
              value={formData.MasterData?.ProjectName?.label}
            />
            <PreviewItem
              label="Shift"
              value={formData.MasterData?.Shift?.label}
            />
            <PreviewItem
              label="Technique"
              value={formData.MasterData?.Technique?.label}
            />
          </div>

          {/* Work Type */}
          <div className={styles.detailsBox}>
            <PreviewItem label="Work Type" value={formData.WorkType} />
            <PreviewItem
              label="Input Point"
              value={
                formData.selectPointPredrilling?.value
                  ? formData.selectPointPredrilling.label
                  : formData.selectPoints
              }
            />
          </div>

          {/* Time */}
          <div className={styles.detailsBox}>
            <PreviewItem label="Start Time" value={formData.startTime} />
            <PreviewItem label="Stop Time" value={formData.stopTime} />
            <PreviewItem
              label="Duration"
              value={formData.tempFormatTimeHrMinSec}
            />
          </div>

          {/* Metrics */}
          <div className={styles.detailsBox}>
            <PreviewItem label="Depth" value={formData.depth} />
            <PreviewItem
              label={formData.WorkType === "Predrilling" ? "Diameter" : "Count"}
              value={formData.count}
            />

            {formData.WorkType === "Production" && (
              <>
                <PreviewItem
                  label="Diameter"
                  value={formData.calculateDiameter}
                />
                <PreviewItem
                  label="Total Quantity"
                  value={formData.calculateTotalQuantity}
                />
              </>
            )}
          </div>

          {/* Equipment */}
          <div
            className={styles.detailsBox}
            style={{ gridTemplateColumns: "repeat(2, 1fr)" }}
          >
            <div className={styles.details}>
              <label>Equipment</label>
              {formData.equipment?.length ? (
                <ul style={{ listStyle: "circle", marginLeft: "40px" }}>
                  {formData?.equipment?.map((e: IDropValue, i: number) => {
                    return (
                      <li key={i} className={styles.equipmentValue}>
                        {e.label}
                      </li>
                    );
                  })}
                </ul>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>

        {/* Footer */}
        {/* <div className={styles.footerPageBox}>
          <Button className={styles.previewBtn} onClick={handleSubmit}>
            Submit
          </Button>
        </div> */}
      </div>
    </div>
  );
};

export default Preview;
