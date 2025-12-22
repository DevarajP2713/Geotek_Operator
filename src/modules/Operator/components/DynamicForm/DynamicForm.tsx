/* eslint-disable no-unused-expressions */
/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import React, { useState, useRef, useEffect } from "react";
import styles from "./DynamicForm.module.scss";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import moment from "moment";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import CustomSelect from "../../../../shared/components/common/customInputFields/CustomSelect/CustomSelect";
import RealTime from "./RealTime";
import { Button, message } from "antd";
import RefreshIcon from "@mui/icons-material/Refresh";
import useWorkType from "../../hooks/useWorkType";
import { IDropValue } from "../../../../types/Types";
import {
  calculateAverageDiameter,
  formatTimeHrMinSec,
  // normalizeNumber,
  removeNonNumericChars,
} from "../../entities/utility";
import { IWorkTypeDetailsObject } from "../../entities/types";

// Interfaces
interface IFormPageLabels {
  InputPoint: string;
  Timer: string;
  Depth: string;
  Diameter: string;
  Equipment: string;
}

export interface DynamicFormProps {
  PageTitle: string;
  NavigateTitle: string;
  FormPageLabels: IFormPageLabels;
}

interface IPreviewFormData {
  WorkType?: "Predrilling" | "Production";
  MasterData?: IWorkTypeDetailsObject;

  selectPointPredrilling?: IDropValue;
  selectPoints?: string;

  startTime?: string;
  stopTime?: string;
  duration?: string;

  depth?: string | number;
  count?: string | number;

  calculateDiameter?: string | number;
  calculateTotalQuantity?: string | number;

  equipment?: IDropValue[];
}

const DynamicForm = ({ data }: { data: DynamicFormProps }): JSX.Element => {
  // Variables
  const {
    refetch,
    fetchTechniques,
    masterData,
    equipmentChoices,
    calibrationValue,
    requestStatus,
  } = useWorkType();
  const navigate = useNavigate();
  const { project_id, shift_id, shift_type, technique_id } = useParams();

  const location = useLocation();
  const formData = (location.state || {}) as IPreviewFormData;

  /* ---------------------- Form state ---------------------- */
  const [selectPoints, setSelectPoints] = useState<string>("0");
  const [depth, setDepth] = useState<string>("0");
  const [count, setCount] = useState<string>("0");
  const [duration, setDuration] = useState(0);
  const [startTime, setStartTime] = useState<string | undefined>("");
  const [stopTime, setStopTime] = useState<string | undefined>("");
  const [selectEquipments, setSelectEquipments] = useState<IDropValue[]>([]);
  const [selectPointPredrilling, setSelectPointPredrilling] =
    useState<IDropValue | null>();
  const [calculateDiameter, setCalculateDiameter] = useState<string>("");
  const [calculateTotalQuantity, setCalculateTotalQuantity] =
    useState<string>("");
  const [isStart, setIsStart] = useState<boolean>(true);
  const timerRef = useRef<any>(null);
  const startTimestampRef = useRef<number | null>(null);
  // const [onScroll, setOnScroll] = useState<boolean>(false);

  // All Functions
  // const startTimer = (): void => {
  //   if (!timerRef.current) {
  //     setStartTime(moment().format("HH:mm:ss"));
  //     timerRef.current = setInterval(() => {
  //       setDuration((p) => p + 1);
  //     }, 1000);
  //   }

  //   setIsStart(false);
  // };
  const startTimer = (): void => {
    if (!timerRef.current) {
      const now = Date.now();
      startTimestampRef.current = now;

      setStartTime(moment(now).format("HH:mm:ss"));

      timerRef.current = setInterval(() => {
        if (startTimestampRef.current) {
          const diffSeconds = Math.floor(
            (Date.now() - startTimestampRef.current) / 1000
          );
          setDuration(diffSeconds);
        }
      }, 1000);
    }

    setIsStart(false);
  };

  // const stopTimer = (): void => {
  //   if (timerRef.current) {
  //     clearInterval(timerRef.current);
  //     timerRef.current = null;
  //     setStopTime(moment().format("HH:mm:ss"));
  //   }

  //   setIsStart(true);
  // };
  const stopTimer = (): void => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }

    if (startTimestampRef.current) {
      const finalDuration = Math.floor(
        (Date.now() - startTimestampRef.current) / 1000
      );
      setDuration(finalDuration);
    }

    setStopTime(moment().format("HH:mm:ss"));
    setIsStart(true);
  };

  // const resetTimer = (): void => {
  //   stopTimer();
  //   setDuration(0);
  //   setStartTime("");
  //   setStopTime("");
  //   setIsStart(true);
  // };
  const resetTimer = (): void => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }

    startTimestampRef.current = null;
    setDuration(0);
    setStartTime("");
    setStopTime("");
    setIsStart(true);
  };

  const formatTime = (secs: number) => {
    const h = String(Math.floor(secs / 3600)).padStart(2, "0");
    const m = String(Math.floor((secs % 3600) / 60)).padStart(2, "0");
    const s = String(secs % 60).padStart(2, "0");
    return `${h}:${m}:${s}`;
  };

  const updateNumber = (
    direction: "up" | "down",
    StateValue: any,
    UpdateState: any,
    IsNumberAndTextField: boolean
  ) => {
    const numbers = StateValue.match(/\d+/g);

    // No numbers → do nothing
    if (!numbers) return;

    // Merge all numbers (58GH56 → 5856)
    const mergedNum = parseInt(numbers.join(""), 10);

    const newNum = IsNumberAndTextField
      ? direction === "up"
        ? mergedNum + 1
        : Math.max(mergedNum - 1, 0)
      : direction === "up"
      ? mergedNum
      : Math.max(mergedNum, 0);

    // Pure number → pad
    if (/^\d+$/.test(StateValue)) {
      UpdateState(String(newNum));
    } else {
      UpdateState(String(newNum));
    }
  };

  const ProductionDepthOnChangeValue = (
    val: string,
    IsButtonClick: boolean,
    direction: "up" | "down"
  ) => {
    const changeCount = removeNonNumericChars(count.toString());
    const avgDiameter = calculateAverageDiameter(
      Number(changeCount),
      parseFloat(calibrationValue),
      Number(val)
    );

    if (IsButtonClick) {
      updateNumber(direction, val?.toString(), setDepth, false);
    } else {
      setDepth(val);
    }

    setCalculateDiameter(avgDiameter);
  };

  const ProductionCountOnChangeValue = (
    val: string,
    IsButtonClick: boolean,
    direction: "up" | "down"
  ) => {
    const changeCount = removeNonNumericChars(val.toString());
    const avgDiameter = calculateAverageDiameter(
      Number(changeCount),
      parseFloat(calibrationValue),
      Number(depth)
    );

    const totalQuantity = (
      Number(changeCount) *
      Number(calibrationValue) *
      1.5
    ).toFixed(2);

    if (IsButtonClick) {
      updateNumber(direction, val?.toString(), setCount, false);
    } else {
      setCount(changeCount);
    }

    setCalculateDiameter(avgDiameter);
    setCalculateTotalQuantity(totalQuantity);
  };

  useEffect(() => {
    if (formData?.selectPoints) {
      setSelectPoints(formData?.selectPoints);
      setDepth(formData?.depth?.toString() || "0");
      setCount(formData?.count?.toString() || "0");
      setDuration(Number(formData?.duration));
      setStartTime(formData?.startTime);
      setStopTime(formData?.stopTime);
      setSelectEquipments(
        formData?.equipment?.length ? formData?.equipment : []
      );
      setSelectPointPredrilling(formData?.selectPointPredrilling);
      setCalculateDiameter(
        formData?.calculateDiameter
          ? formData?.calculateDiameter?.toString()
          : ""
      );
      setCalculateTotalQuantity(
        formData?.calculateTotalQuantity
          ? formData?.calculateTotalQuantity?.toString()
          : ""
      );
    }
  }, [formData?.selectPoints]);

  useEffect(() => {
    const fetchData = async () => {
      await refetch(Number(project_id), Number(shift_id), Number(technique_id));
      await fetchTechniques(Number(project_id), Number(technique_id));
    };

    fetchData();
  }, [project_id, shift_id, technique_id]);

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (
        document.visibilityState === "visible" &&
        startTimestampRef.current &&
        !isStart
      ) {
        const diffSeconds = Math.floor(
          (Date.now() - startTimestampRef.current) / 1000
        );
        setDuration(diffSeconds);
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () =>
      document.removeEventListener("visibilitychange", handleVisibilityChange);
  }, [isStart]);

  useEffect(() => {
    setSelectEquipments(
      formData?.equipment
        ? formData?.equipment?.length
          ? formData?.equipment
          : []
        : equipmentChoices?.filter((e) => e.isActive)
    );
  }, [requestStatus]);

  return (
    <div className={styles.con}>
      {/* ---------------------- Header ---------------------- */}
      <div className={styles.header}>
        <div className={styles.headerLeftBox}>
          <KeyboardBackspaceIcon
            style={{ cursor: "pointer" }}
            onClick={() =>
              navigate(
                `/projects/${project_id}/shift/${shift_id}/${shift_type}/techniques/${technique_id}`
              )
            }
          />
          <h1 className={styles.title}>{data?.PageTitle} Details</h1>
        </div>

        {/* Real-Time Clock */}
        <div className={styles.nowClock}>{<RealTime />}</div>
      </div>

      {/* ---------------------- Body ---------------------- */}
      <div className={styles.body}>
        <div className={styles.formPageBox}>
          {/* -------- Select Input Points -------- */}
          {masterData?.Predrilling &&
          masterData?.PredrillingNumber?.length &&
          data?.PageTitle === "Production" ? (
            <div className={styles.inputField}>
              <label>{data?.FormPageLabels?.InputPoint}</label>
              <CustomSelect
                placeholder="Select Input point"
                options={masterData?.PredrillingNumber}
                size="large"
                value={selectPointPredrilling}
                onChange={(e: any) => {
                  const selected = masterData?.PredrillingNumber.filter(
                    (item) => e === item.value
                  )[0];
                  setSelectPointPredrilling(selected);
                }}
              />
            </div>
          ) : (
            <div className={styles.inputField}>
              <label>{data?.FormPageLabels?.InputPoint}</label>

              {/* <div
                className={styles.inputWheelWrapper}
                onWheel={(e: React.WheelEvent<HTMLDivElement>) => {
                  // Extract only the numeric portion from text
                  const numeric = parseInt(selectPoints.replace(/\D/g, ""), 10);

                  const safeNum = isNaN(numeric) ? 0 : numeric;

                  const newNum =
                    e.deltaY < 0 ? safeNum + 1 : Math.max(safeNum - 1, 0);

                  // Rebuild text: keep letters, replace digits with updated number
                  const updated = selectPoints.replace(/\d+/g, String(newNum));

                  setSelectPoints(
                    updated || String(newNum).padStart(2, "0") // fallback if no digits existed
                  );

                  setOnScroll(true);
                }}
              >
                <div className={styles.prevNum}>
                  {String(
                    Math.max(
                      parseInt(selectPoints.replace(/\D/g, ""), 10) - 1,
                      0
                    )
                  ).padStart(2, "0")}
                </div>

                <input
                  type="text"
                  value={
                    onScroll ? selectPoints.replace(/\D/g, "") : selectPoints
                  }
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setSelectPoints(e.target.value); // accept alphanumeric freely
                    setOnScroll(false);
                  }}
                  className={styles.mainInput}
                />

                <div className={styles.nextNum}>
                  {String(
                    (parseInt(selectPoints.replace(/\D/g, ""), 10) || 0) + 1
                  ).padStart(2, "0")}
                </div>
              </div> */}

              <div className={styles.inputWheelWrapper}>
                <button
                  onClick={() =>
                    updateNumber("up", selectPoints, setSelectPoints, true)
                  }
                  className={styles.inputBtn}
                >
                  ▲
                </button>

                {/* <input
                  type="text"
                  value={selectPoints}
                  onChange={(e) => setSelectPoints(e.target.value)}
                  className={styles.mainInput}
                /> */}

                <input
                  type="text"
                  value={selectPoints}
                  onChange={(e) => {
                    let val = e.target.value;

                    // If user deletes everything → fallback to "0"
                    if (val === "") {
                      setSelectPoints("0");
                      return;
                    }

                    // If current value is "0", replace it instead of appending
                    if (selectPoints === "0") {
                      setSelectPoints(val);
                      return;
                    }

                    // Remove leading zero only if followed by alphanumeric
                    val = val.replace(/^0+(?=[a-zA-Z0-9])/, "");

                    setSelectPoints(val);
                  }}
                  className={styles.mainInput}
                />

                <button
                  onClick={() =>
                    updateNumber("down", selectPoints, setSelectPoints, true)
                  }
                  className={styles.inputBtn}
                >
                  ▼
                </button>
              </div>
            </div>
          )}

          {/* -------- Timer -------- */}
          <div className={styles.inputField}>
            <label>{data?.FormPageLabels?.Timer}</label>
            <h2>{formatTime(duration)}</h2>
          </div>

          <div className={styles.timerField}>
            <div className={styles.timeMeta}>
              <p>
                Start Time: <span>{startTime || "--:--:--"}</span>
              </p>
              <p>
                Stop Time: <span>{stopTime || "--:--:--"}</span>
              </p>
            </div>
            <Button
              className={styles.isStartBtn}
              onClick={() => {
                if (startTime === "" || stopTime === "") {
                  if (isStart) {
                    startTimer();
                  } else {
                    stopTimer();
                  }
                }
              }}
              style={{ background: startTime && stopTime ? "#555" : "#ff6b00" }}
              disabled={startTime && stopTime ? true : false}
            >
              {isStart ? "Start" : "Stop"}
            </Button>
            <RefreshIcon
              titleAccess={`${
                startTime || stopTime ? "reset time" : "already reseted"
              }`}
              style={{ color: startTime || stopTime ? "#ff6b00" : "#555" }}
              className={styles.refreshIcon}
              onClick={() => {
                if (startTime || stopTime) {
                  resetTimer();
                }
              }}
            />
          </div>

          {/* -------- Depth + Count / Diameter -------- */}
          <div className={styles.inputField}>
            <label>{data?.FormPageLabels?.Depth}</label>
            {/* <div
              className={styles.inputWheelWrapper}
              onWheel={(e: React.WheelEvent<HTMLDivElement>) => {
                if (startTime && stopTime) {
                  if (e.deltaY < 0) {
                    if (data?.PageTitle === "Production") {
                      ProductionDepthOnChangeValue(depth + 1);
                    } else {
                      setDepth(depth + 1);
                    }
                  } else {
                    if (data?.PageTitle === "Production") {
                      ProductionDepthOnChangeValue(depth > 0 ? depth - 1 : 0);
                    } else {
                      setDepth(depth > 0 ? depth - 1 : 0);
                    }
                  }
                }
              }}
            >
              <div className={styles.prevNum}>
                {depth === 0
                  ? ""
                  : (depth - 1).toString().length === 1
                  ? `0${depth - 1}`
                  : depth - 1}
              </div>

              <input
                type="number"
                value={depth === -1 ? "00" : depth.toString().padStart(2, "0")}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  const num = Number(e.target.value);

                  if (!isNaN(num)) {
                    if (data?.PageTitle === "Production") {
                      ProductionDepthOnChangeValue(num);
                    } else {
                      setDepth(num);
                    }
                  }
                }}
                className={styles.mainInput}
                disabled={startTime && stopTime ? false : true}
              />

              <div className={styles.nextNum}>
                {(depth + 1).toString().length === 1
                  ? `0${depth + 1}`
                  : depth + 1}
              </div>
            </div>*/}

            <div className={styles.inputWheelWrapper}>
              <button
                onClick={() => {
                  if (data?.PageTitle === "Production") {
                    ProductionDepthOnChangeValue(
                      (Number(depth) + 1).toString(),
                      true,
                      "up"
                    );
                  } else {
                    updateNumber(
                      "up",
                      (Number(depth) + 1)?.toString(),
                      setDepth,
                      false
                    );
                  }
                }}
                className={
                  startTime && stopTime ? styles.inputBtn : styles.inputNullBtn
                }
                disabled={startTime && stopTime ? false : true}
              >
                ▲
              </button>

              {/* <input
                type="number"
                value={depth}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  const num = normalizeNumber(e.target.value);

                  if (!isNaN(num)) {
                    if (data?.PageTitle === "Production") {
                      ProductionDepthOnChangeValue(num, false, "up");
                    } else {
                      setDepth(num);
                    }
                  }
                }}
                className={styles.mainInput}
                disabled={startTime && stopTime ? false : true}
              /> */}
              <input
                type="text"
                inputMode="decimal"
                value={depth}
                onChange={(e) => {
                  let val = e.target.value;

                  // allow digits and decimal point only
                  val = val.replace(/[^0-9.]/g, "");

                  // allow only ONE decimal point
                  val = val.replace(/(\..*)\./g, "$1");

                  // 🔥 replace initial "0" correctly
                  if (depth === "0" && val !== "0" && !val.startsWith("0.")) {
                    val = val.replace(/^0+/, "");
                  }

                  // allow "0" while typing
                  if (val === "") {
                    setDepth("0");
                    return;
                  }

                  if (data?.PageTitle === "Production") {
                    ProductionDepthOnChangeValue(val, false, "up");
                  } else {
                    setDepth(val);
                  }
                }}
                className={styles.mainInput}
                disabled={!(startTime && stopTime)}
              />

              <button
                onClick={() => {
                  if (data?.PageTitle === "Production") {
                    const depthCheckValue =
                      Number(depth) > 0 ? (Number(depth) - 1).toString() : "0";
                    ProductionDepthOnChangeValue(depthCheckValue, true, "down");
                  } else {
                    const depthCheckValue =
                      Number(depth) > 0 ? Number(depth) - 1 : 0;
                    updateNumber(
                      "down",
                      depthCheckValue?.toString(),
                      setDepth,
                      false
                    );
                  }
                }}
                className={
                  startTime && stopTime ? styles.inputBtn : styles.inputNullBtn
                }
                disabled={startTime && stopTime ? false : true}
              >
                ▼
              </button>
            </div>
          </div>

          <div className={styles.inputField}>
            <label>{data?.FormPageLabels?.Diameter}</label>
            {/* <div
              className={styles.inputWheelWrapper}
              onWheel={(e: React.WheelEvent<HTMLDivElement>) => {
                if (startTime && stopTime) {
                  if (e.deltaY < 0) {
                    if (data?.PageTitle === "Production") {
                      ProductionCountOnChangeValue(count + 1);
                    } else {
                      setCount(count + 1);
                    }
                  } else {
                    if (data?.PageTitle === "Production") {
                      ProductionCountOnChangeValue(count > 0 ? count - 1 : 0);
                    } else {
                      setCount(count > 0 ? count - 1 : 0);
                    }
                  }
                }
              }}
            >
              <div className={styles.prevNum}>
                {count === 0
                  ? ""
                  : (count - 1).toString().length === 1
                  ? `0${count - 1}`
                  : count - 1}
              </div>

              <input
                type="number"
                value={count === -1 ? "00" : count.toString().padStart(2, "0")}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  const num = Number(e.target.value);
                  if (!isNaN(num)) {
                    if (data?.PageTitle === "Production") {
                      ProductionCountOnChangeValue(num);
                    } else {
                      setCount(num);
                    }
                  }
                }}
                className={styles.mainInput}
                disabled={startTime && stopTime ? false : true}
              />

              <div className={styles.nextNum}>
                {(count + 1).toString().length === 1
                  ? `0${count + 1}`
                  : count + 1}
              </div>
            </div> */}

            <div className={styles.inputWheelWrapper}>
              <button
                onClick={() => {
                  if (data?.PageTitle === "Production") {
                    ProductionCountOnChangeValue(
                      (Number(count) + 1).toString(),
                      true,
                      "up"
                    );
                  } else {
                    updateNumber(
                      "up",
                      (Number(count) + 1)?.toString(),
                      setCount,
                      false
                    );
                  }
                }}
                className={
                  startTime && stopTime ? styles.inputBtn : styles.inputNullBtn
                }
                disabled={startTime && stopTime ? false : true}
              >
                ▲
              </button>

              {/* <input
                type="number"
                value={count}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  const num = normalizeNumber(e.target.value);

                  if (!isNaN(num)) {
                    if (data?.PageTitle === "Production") {
                      ProductionCountOnChangeValue(num, false, "up");
                    } else {
                      setCount(num);
                    }
                  }
                }}
                className={styles.mainInput}
                disabled={startTime && stopTime ? false : true}
              /> */}
              <input
                type="text"
                inputMode="decimal"
                value={count}
                onChange={(e) => {
                  let val = e.target.value;
                  val = val.replace(/[^0-9.]/g, "");
                  val = val.replace(/(\..*)\./g, "$1");

                  if (count === "0" && val !== "0" && !val.startsWith("0.")) {
                    val = val.replace(/^0+/, "");
                  }

                  // allow "0" while typing
                  if (val === "") {
                    setCount("0");
                    return;
                  }

                  if (data?.PageTitle === "Production") {
                    ProductionCountOnChangeValue(val, false, "up");
                  } else {
                    setCount(val);
                  }
                }}
                className={styles.mainInput}
                disabled={!(startTime && stopTime)}
              />

              <button
                onClick={() => {
                  if (data?.PageTitle === "Production") {
                    const countCheckValue =
                      Number(count) > 0 ? Number(count) - 1 : 0;
                    ProductionCountOnChangeValue(
                      countCheckValue?.toString(),
                      true,
                      "down"
                    );
                  } else {
                    const countCheckValue =
                      Number(count) > 0 ? Number(count) - 1 : 0;
                    updateNumber(
                      "down",
                      countCheckValue?.toString(),
                      setCount,
                      false
                    );
                  }
                }}
                className={
                  startTime && stopTime ? styles.inputBtn : styles.inputNullBtn
                }
                disabled={startTime && stopTime ? false : true}
              >
                ▼
              </button>
            </div>
          </div>
        </div>

        {data?.PageTitle === "Production" ? (
          <div className={styles.formPageBox} style={{ marginTop: "45px" }}>
            <div className={styles.calculationBox}>
              <label>Diameter</label>
              <h2>{calculateDiameter}</h2>
            </div>
            <div className={styles.calculationBox}>
              <label>Total Quantity</label>
              <h2>{calculateTotalQuantity}</h2>
            </div>
          </div>
        ) : (
          ""
        )}

        <div
          className={styles.formPageBox}
          style={{ marginTop: "45px", gridTemplateColumns: "repeat(2, 1fr)" }}
        >
          {/* -------- Equipment Dropdown -------- */}
          <div className={styles.inputField}>
            <label>{data?.FormPageLabels?.Equipment}</label>
            <CustomSelect
              disabled={startTime && stopTime ? false : true}
              placeholder={`select ${data?.FormPageLabels?.Equipment}s`}
              options={equipmentChoices}
              size="large"
              mode="multiple"
              value={selectEquipments}
              onChange={(e: any) => {
                const selected = equipmentChoices.filter((item) =>
                  e.includes(item.value)
                );
                setSelectEquipments(selected);
              }}
            />
          </div>
        </div>

        {/* ---------------------- Footer ---------------------- */}
        {(selectPoints !== "0" || selectPointPredrilling?.value) &&
        depth !== "0" &&
        count !== "0" &&
        startTime &&
        stopTime &&
        duration &&
        selectEquipments?.length ? (
          <div className={styles.footerPageBox}>
            <Button
              className={styles.previewBtn}
              onClick={() => {
                if (
                  masterData?.PredrillingNumber?.length &&
                  masterData?.PredrillingNumber?.some(
                    (e) =>
                      e.label?.toString().trim()?.toLowerCase() ===
                      selectPoints?.toString().trim()?.toLowerCase()
                  ) &&
                  data?.PageTitle === "Predrilling"
                ) {
                  message.error("Input point already exists");
                } else {
                  const tempFormatTimeHrMinSec = formatTimeHrMinSec(duration);
                  navigate(
                    `/projects/${project_id}/shift/${shift_id}/${shift_type}/techniques/${technique_id}/${data?.NavigateTitle}/preview`,
                    {
                      state: {
                        selectPoints,
                        selectPointPredrilling,
                        depth,
                        count,
                        calibrationValue,
                        calculateDiameter,
                        calculateTotalQuantity,
                        startTime,
                        stopTime,
                        tempFormatTimeHrMinSec,
                        equipment: selectEquipments,
                        allEquipments: equipmentChoices,
                        WorkType: data?.PageTitle,
                        MasterData: masterData,
                      },
                    }
                  );
                }
              }}
            >
              Preview
            </Button>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default DynamicForm;
