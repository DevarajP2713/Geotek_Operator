// import React from "react";
// import { Checkbox, Row, Col } from "antd";
// import styles from "./CustomCheckBoxGroup.module.scss";

// export interface CustomCheckboxGroupWithLabelProps {
//   questionLabel?: string;
//   options: string[];
//   selectedOptions?: string[];
//   onChange?: (values: string[]) => void;
//   isValid?: boolean;
//   errorMsg?: string;
//   readOnly?: boolean;
//   width?: string | number;
//   columns?: number; // default columns on large screens
// }

// const CustomCheckboxGroup: React.FC<CustomCheckboxGroupWithLabelProps> = ({
//   questionLabel = "",
//   options,
//   selectedOptions = [],
//   onChange,
//   isValid = true,
//   errorMsg = "",
//   readOnly = false,
//   width = "100%",
//   columns = 3,
// }) => {
//   // fallback to 3, 2, or 1 columns
//   const dynamicColumns =
//     columns ?? (options.length <= 3 ? 1 : options.length <= 6 ? 2 : 3);

//   return (
//     <div className={styles.wrapper} style={{ width }}>
//       {questionLabel?.trim() && (
//         <label className={styles.label}>{questionLabel}</label>
//       )}

//       <Checkbox.Group
//         value={selectedOptions}
//         onChange={onChange}
//         disabled={readOnly}
//       >
//         <Row gutter={[8, 8]}>
//           {options.map((opt) => (
//             <Col
//               key={opt}
//               xs={24}
//               sm={24}
//               md={24 / Math.min(dynamicColumns, 3)}
//               lg={24 / dynamicColumns}
//             >
//               <Checkbox
//                 value={opt}
//                 style={{
//                   fontSize: "13px",
//                   color: "#8492C5",
//                   wordBreak: "break-word",
//                 }}
//               >
//                 {opt}
//               </Checkbox>
//             </Col>
//           ))}
//         </Row>
//       </Checkbox.Group>

//       {!isValid && errorMsg && <div className={styles.error}>{errorMsg}</div>}
//     </div>
//   );
// };

// export default CustomCheckboxGroup;

import React from "react";
import { Checkbox } from "antd";
import styles from "./CustomCheckBoxGroup.module.scss";

export interface CustomCheckboxGroupWithLabelProps {
  questionLabel?: string;
  options: string[];
  selectedOptions?: string[];
  onChange?: (values: string[]) => void;
  isValid?: boolean;
  errorMsg?: string;
  readOnly?: boolean;
  width?: string | number;
  columns?: number; // default number of columns on large screens
}

const CustomCheckboxGroup: React.FC<CustomCheckboxGroupWithLabelProps> = ({
  questionLabel = "",
  options,
  selectedOptions = [],
  onChange,
  isValid = true,
  errorMsg = "",
  readOnly = false,
  width = "100%",
  columns = 3,
}) => {
  return (
    <div className={styles.wrapper} style={{ width }}>
      {questionLabel?.trim() && (
        <label className={styles.label}>{questionLabel}</label>
      )}

      <div
        className={styles.gridContainer}
        style={{
          gridTemplateColumns: `repeat(${columns}, 1fr)`,
        }}
      >
        {options.map((opt) => (
          <div key={opt} className={styles.gridItem}>
            <Checkbox
              value={opt}
              checked={selectedOptions.includes(opt)}
              onChange={(e) => {
                if (!onChange) return;
                const newValues = e.target.checked
                  ? [...selectedOptions, opt]
                  : selectedOptions.filter((v) => v !== opt);
                onChange(newValues);
              }}
              disabled={readOnly}
              style={{
                fontSize: "13px",
                color: "#8492C5",
                wordBreak: "break-word",
              }}
              className={styles.checkbox}
            >
              {opt}
            </Checkbox>
          </div>
        ))}
      </div>

      {!isValid && errorMsg && <div className={styles.error}>{errorMsg}</div>}
    </div>
  );
};

export default CustomCheckboxGroup;
