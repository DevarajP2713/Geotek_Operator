/* eslint-disable complexity */
// /* eslint-disable no-unused-expressions */
// /* eslint-disable @rushstack/no-new-null */
// /* eslint-disable @typescript-eslint/no-explicit-any */
// import * as React from "react";
// import { DatePicker } from "antd";
// import EditIcon from "@mui/icons-material/Edit";
// import styles from "./CustomDatePicker.module.scss";
// import moment, { Moment } from "moment";
// import CustomTooltip from "../../CustomTooltip/CustomTooltip";

// interface CustomDateSelectProps {
//   placeholder?: string;
//   value?: string;
//   isValid?: boolean;
//   errorMsg?: string;
//   Label?: string;
//   disabled?: boolean;
//   disabledDate?: (currentDate: Moment) => boolean;
//   picker?: "time" | "date" | "week" | "month" | "quarter" | "year";
//   customReadOnly?: boolean;
//   loading?: boolean;
//   isCurrentUser?: boolean;
//   isDateOfBirth?: boolean;
//   onChange?: (date: any, dateString: string | null) => void;
// }

// const CustomDatePicker: React.FC<CustomDateSelectProps> = ({
//   placeholder,
//   value,
//   isValid = true,
//   errorMsg,
//   Label,
//   onChange,
//   disabled,
//   disabledDate,
//   picker,
//   customReadOnly = false,
//   loading = false,
//   isCurrentUser = false,
//   isDateOfBirth = false,
// }) => {
//   // Ensure the value is in the correct moment format
//   const formattedValue = React.useMemo(() => {
//     if (!value) return null;

//     const parsedDate = moment(
//       value,
//       ["MM-DD-YYYY", "YYYY-MM-DD", moment.ISO_8601],
//       true
//     );

//     return parsedDate.isValid() ? parsedDate : null;
//   }, [value]);

//   const formattedDateText = !isDateOfBirth
//     ? formattedValue?.format("MM-DD-YYYY")
//     : formattedValue?.format("MM/DD");

//   return (
//     <div className={styles.wrapper}>
//       {Label?.trim() && (
//         <div
//           style={{
//             display: isCurrentUser ? "flex" : "block",
//             alignItems: "center",
//             height: "19px",
//             gap: "15px",
//           }}
//         >
//           <label className="inputLabels">{Label}</label>

//           <div
//             title="Go to My Microsoft 365 profile"
//             style={{
//               display: isCurrentUser ? "flex" : "none",
//               cursor: "pointer",
//               color: "#3d6cd0",
//             }}
//             onClick={() => {
//               window.open(
//                 "https://www.microsoft365.com/search/overview?origin=ProfileAboutMe",
//                 "_blank"
//               );
//             }}
//           >
//             <EditIcon
//               style={{
//                 fontSize: "16px",
//               }}
//             />
//           </div>
//         </div>
//       )}

//       {customReadOnly ? (
//         <div className={"readOnlyValue"}>
//           <CustomTooltip
//             text={formattedDateText || "-"}
//             width={"250px"}
//             placement="left"
//             loading={loading}
//           />
//         </div>
//       ) : (
//         <DatePicker
//           className={`${styles.customDatePicker} ${
//             isValid ? "" : styles.error
//           }`}
//           value={formattedValue}
//           format={"MM-DD-YYYY"}
//           placeholder={placeholder}
//           disabled={disabled}
//           disabledDate={disabledDate}
//           picker={picker}
//           onChange={(date, dateString) => {
//             onChange?.(
//               date ? date.format("MM-DD-YYYY") : null,
//               dateString || ""
//             );
//           }}
//           allowClear
//           defaultPickerValue={moment()}
//         />
//       )}

//       {!isValid && !customReadOnly && (
//         <span className={styles.errorMessage}>{errorMsg}</span>
//       )}
//     </div>
//   );
// };

// export default CustomDatePicker;
/* eslint-disable no-unused-expressions */
/* eslint-disable @rushstack/no-new-null */
/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from "react";
import { DatePicker } from "antd";
import EditIcon from "@mui/icons-material/Edit";
import styles from "./CustomDatePicker.module.scss";
import moment, { Moment } from "moment";
import CustomTooltip from "../../CustomTooltip/CustomTooltip";

interface CustomDateSelectProps {
  placeholder?: string;
  value?: string | any;
  isValid?: boolean;
  errorMsg?: string;
  Label?: string;
  disabled?: boolean;
  disabledDate?: (currentDate: Moment) => boolean;
  picker?: "time" | "date" | "week" | "month" | "quarter" | "year";
  customReadOnly?: boolean;
  loading?: boolean;
  isCurrentUser?: boolean;
  isDateOfBirth?: boolean;
  selectedUserEmail?: string;
  isRequired?: boolean;
  onChange?: (date: any, dateString: string | null) => void;
}

const CustomDatePicker: React.FC<CustomDateSelectProps> = ({
  placeholder,
  value,
  isValid = true,
  errorMsg,
  Label,
  onChange,
  disabled,
  disabledDate,
  picker,
  customReadOnly = false,
  loading = false,
  selectedUserEmail = "",
  isRequired = false,
  isCurrentUser = false,
  isDateOfBirth = false,
}) => {
  // Ensure the value is in the correct moment format — return `undefined` when no valid date
  const formattedValue = React.useMemo(() => {
    // treat undefined / null / empty string as "no value" -> return undefined
    if (value === undefined || value === null || value === "") return undefined;

    const parsedDate = moment(
      value,
      ["MM-DD-YYYY", "YYYY-MM-DD", moment.ISO_8601],
      true
    );

    return parsedDate.isValid() ? parsedDate : undefined;
  }, [value]);

  const formattedDateText = !isDateOfBirth
    ? formattedValue?.format("MM-DD-YYYY")
    : formattedValue?.format("MM/DD");

  return (
    <div className={styles.wrapper}>
      {Label?.trim() && (
        <div
          style={{
            display: isCurrentUser ? "flex" : "block",
            alignItems: "center",
            height: "19px",
            gap: "15px",
          }}
        >
          <label className="inputLabels">
            {Label}
            {isRequired && <span className="requiredIcon">*</span>}
          </label>

          <div
            title="Go to My Microsoft 365 profile"
            style={{
              display: isCurrentUser ? "flex" : "none",
              cursor: "pointer",
              color: "#3d6cd0",
            }}
            onClick={() => {
              window.open(
                // "https://www.microsoft365.com/search/overview?origin=ProfileAboutMe",
                `https://m365.cloud.microsoft/search/people?defaultRoute=General&form=delve&q=${selectedUserEmail}`,
                "_blank"
              );
            }}
          >
            <EditIcon
              style={{
                fontSize: "16px",
              }}
            />
          </div>
        </div>
      )}

      {customReadOnly ? (
        <div className={"readOnlyValue"}>
          <CustomTooltip
            text={formattedDateText || "-"}
            width={"250px"}
            placement="left"
            loading={loading}
          />
        </div>
      ) : (
        <DatePicker
          key={formattedValue ? "with-value" : "no-value"} // 👈 resets calendar
          className={`${styles.customDatePicker} ${
            isValid ? "" : styles.error
          }`}
          // pass undefined when there's no date (so defaultPickerValue works)
          value={formattedValue}
          format={"MM-DD-YYYY"}
          placeholder={placeholder}
          disabled={disabled}
          disabledDate={disabledDate}
          picker={picker}
          onChange={(date, dateString) => {
            onChange?.(
              date ? date.format("MM-DD-YYYY") : null,
              dateString || ""
            );
          }}
          allowClear
          // <-- important: show today's month in the panel when no value is selected
          defaultPickerValue={formattedValue ?? moment()}
        />
      )}

      {!isValid && !customReadOnly && (
        <span className={styles.errorMessage}>{errorMsg}</span>
      )}
    </div>
  );
};

export default CustomDatePicker;
