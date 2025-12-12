/* eslint-disable no-unused-expressions */
/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import React, { useState, useRef, useEffect } from "react";
import styles from "./DynamicForm.module.scss";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import moment from "moment";
import { useNavigate, useParams } from "react-router-dom";
import CustomSelect from "../../../../shared/components/common/customInputFields/CustomSelect/CustomSelect";
import RealTime from "./RealTime";
import { Button } from "antd";
import RefreshIcon from "@mui/icons-material/Refresh";
import useWorkType from "../../hooks/useWorkType";
import { IDropValue } from "../../../../types/Types";

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

const DynamicForm = ({ data }: { data: DynamicFormProps }): JSX.Element => {
  // Variables
  const { refetch, fetchTechniques, masterData, equipmentChoices } =
    useWorkType();
  const navigate = useNavigate();
  const { project_id, shift_id, shift_type, technique_id } = useParams();

  /* ---------------------- Form state ---------------------- */
  const [selectPoints, setSelectPoints] = useState<string>("0");
  const [depth, setDepth] = useState<number>(0);
  const [count, setCount] = useState<number>(0);
  const [timer, setTimer] = useState(0);
  const [startTime, setStartTime] = useState<string>("");
  const [stopTime, setStopTime] = useState<string>("");
  const [selectEquipments, setSelectEquipments] = useState<IDropValue[]>([]);
  const [isStart, setIsStart] = useState<boolean>(true);
  const timerRef = useRef<any>(null);
  const [onScroll, setOnScroll] = useState<boolean>(false);

  // All Functions
  const startTimer = (): void => {
    if (!timerRef.current) {
      setStartTime(moment().format("HH:mm:ss"));
      timerRef.current = setInterval(() => {
        setTimer((p) => p + 1);
      }, 1000);
    }

    setIsStart(false);
  };

  const stopTimer = (): void => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
      setStopTime(moment().format("HH:mm:ss"));
    }

    setIsStart(true);
  };

  const resetTimer = (): void => {
    stopTimer();
    setTimer(0);
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

  useEffect(() => {
    const fetchData = async () => {
      await refetch(Number(project_id), Number(shift_id), Number(technique_id));
      await fetchTechniques(Number(project_id), Number(technique_id));
    };

    fetchData();
  }, [project_id, shift_id, technique_id]);

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
          {/* <div className={styles.inputField}>
            <label>{data?.FormPageLabels?.InputPoint}</label>
            <div
              className={styles.inputWheelWrapper}
              onWheel={(e: React.WheelEvent<HTMLDivElement>) => {
                if (e.deltaY < 0) setSelectPoints(selectPoints + 1);
                else setSelectPoints(selectPoints > 0 ? selectPoints - 1 : 0);
              }}
            >
              <div className={styles.prevNum}>
                {selectPoints === 0
                  ? ""
                  : (selectPoints - 1).toString().length === 1
                  ? `0${selectPoints - 1}`
                  : selectPoints - 1}
              </div>

              <input
                type="number"
                value={
                  selectPoints === -1
                    ? "00"
                    : selectPoints.toString().padStart(2, "0")
                }
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  const num = Number(e.target.value);

                  if (!isNaN(num)) setSelectPoints(num);
                }}
                className={styles.mainInput}
              />

              <div className={styles.nextNum}>
                {(selectPoints + 1).toString().length === 1
                  ? `0${selectPoints + 1}`
                  : selectPoints + 1}
              </div>
            </div>
          </div> */}

          <div className={styles.inputField}>
            <label>{data?.FormPageLabels?.InputPoint}</label>

            <div
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
                  Math.max(parseInt(selectPoints.replace(/\D/g, ""), 10) - 1, 0)
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
            </div>
          </div>

          {/* -------- Timer -------- */}
          <div className={styles.inputField}>
            <label>{data?.FormPageLabels?.Timer}</label>
            <h2>{formatTime(timer)}</h2>
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

          {/* -------- Depth + Count -------- */}
          <div className={styles.inputField}>
            <label>{data?.FormPageLabels?.Depth}</label>
            <div
              className={styles.inputWheelWrapper}
              onWheel={(e: React.WheelEvent<HTMLDivElement>) => {
                if (startTime && stopTime) {
                  if (e.deltaY < 0) setDepth(depth + 1);
                  else setDepth(depth > 0 ? depth - 1 : 0);
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
                  if (!isNaN(num)) setDepth(num);
                }}
                className={styles.mainInput}
                disabled={startTime && stopTime ? false : true}
              />

              <div className={styles.nextNum}>
                {(depth + 1).toString().length === 1
                  ? `0${depth + 1}`
                  : depth + 1}
              </div>
            </div>
          </div>

          <div className={styles.inputField}>
            <label>{data?.FormPageLabels?.Diameter}</label>
            <div
              className={styles.inputWheelWrapper}
              onWheel={(e: React.WheelEvent<HTMLDivElement>) => {
                if (startTime && stopTime) {
                  if (e.deltaY < 0) setCount(count + 1);
                  else setCount(count > 0 ? count - 1 : 0);
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
                  if (!isNaN(num)) setCount(num);
                }}
                className={styles.mainInput}
                disabled={startTime && stopTime ? false : true}
              />

              <div className={styles.nextNum}>
                {(count + 1).toString().length === 1
                  ? `0${count + 1}`
                  : count + 1}
              </div>
            </div>
          </div>
        </div>

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

                console.log(selected);
              }}
            />
          </div>
        </div>

        {/* ---------------------- Footer ---------------------- */}
        <div className={styles.footerPageBox}>
          <Button
            className={styles.previewBtn}
            disabled={selectPoints && depth && count ? false : true}
            onClick={() => {
              navigate(
                `/projects/${project_id}/shift/${shift_id}/${shift_type}/techniques/${technique_id}/${data?.NavigateTitle}/preview`,
                {
                  state: {
                    selectPoints,
                    depth,
                    count,
                    startTime,
                    stopTime,
                    timer,
                    equipment: selectEquipments,
                    WorkType: data?.PageTitle,
                    MasterData: masterData,
                  },
                }
              );
            }}
          >
            Preview
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DynamicForm;
