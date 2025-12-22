// /* eslint-disable @typescript-eslint/no-floating-promises */
// /* eslint-disable no-unused-expressions */
// /* eslint-disable react/self-closing-comp */
// import React, { useEffect } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import { Calendar } from "@fullcalendar/core";
// import dayGridPlugin from "@fullcalendar/daygrid";
// import interactionPlugin from "@fullcalendar/interaction";
// import styles from "./ShiftDetails.module.scss";
// import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
// import { IShiftDetailsObject } from "../../entities/types";
// import useShiftDetails from "../../hooks/useShiftDetails";

// const ShiftDetails = (): JSX.Element => {
//   /* local varaiables creation start */
//   const navigate = useNavigate();
//   const { masterData, requestStatus, refetch } = useShiftDetails();
//   const { project_id } = useParams();
//   const sunSVG = `
//   <svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 24 24" fill="white">
//     <path d="M6.76 4.84l-1.8-1.79-1.41 1.41 1.79 1.8 1.42-1.42zm10.45-.02l1.79-1.79-1.41-1.41-1.8 1.79 1.42 1.41zM12 4V1h-2v3h2zm8 8h3v-2h-3v2zM4 12H1v-2h3v2zm2.76 7.16l-1.79 1.79 1.41 1.41 1.8-1.79-1.42-1.41zm10.48 0l1.8 1.79 1.41-1.41-1.79-1.8-1.42 1.42zM12 23v-3h-2v3h2zm0-6a5 5 0 100-10 5 5 0 000 10z"/>
//   </svg>
// `;
//   const moonSVG = `
//   <svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 24 24" fill="white">
//     <path d="M9.37 5.51A7 7 0 0012 19a7 7 0 006.49-4.37 8.5 8.5 0 01-9.12-9.12z"/>
//   </svg>
// `;

//   // Functions
//   const CalendarDataFunc = (Data: IShiftDetailsObject[]): void => {
//     const calendarEl = document.getElementById("calendar");

//     if (calendarEl instanceof HTMLElement) {
//       const calendar = new Calendar(calendarEl, {
//         plugins: [dayGridPlugin, interactionPlugin],
//         initialView: "dayGridMonth",

//         // Example shift events
//         events: Data?.map((value: IShiftDetailsObject) => ({
//           title: value?.ShiftType,
//           date: value?.ShiftDate,
//           extendedProps: { shiftType: value?.ShiftType },
//           publicId: value?.ID,
//         })),

//         // 🔥 Custom cell render
//         eventContent: (arg) => {
//           const shift = arg.event.extendedProps.shiftType;

//           return {
//             html: `
//               <div class="shift-box ${shift}" title="${shift}">
//                 ${shift === "Day" ? sunSVG : moonSVG}
//               </div>
//             `,
//           };
//         },

//         // ✅ Attach click handler properly
//         eventClick: (info) => {
//           const shiftType: string =
//             info?.event?.extendedProps?.shiftType?.toLowerCase();
//           const shiftId: number = info?.event?.extendedProps?.publicId;

//           navigate(
//             `/projects/${project_id}/shift/${shiftId}/${shiftType}/techniques`
//           );
//         },
//       });

//       calendar.render();
//     }
//   };

//   useEffect(() => {
//     refetch(Number(project_id));
//   }, []);

//   useEffect(() => {
//     CalendarDataFunc(masterData);
//   }, [requestStatus]);

//   return (
//     <div className={styles.operatorCon}>
//       <div className={styles.header}>
//         <KeyboardBackspaceIcon
//           style={{ cursor: "pointer" }}
//           onClick={() => navigate(`/projects`)}
//         />
//         <h1 className={styles.title}>Choose Shift</h1>
//       </div>
//       <div className={styles.body}>
//         <div id="calendar"></div>
//       </div>
//     </div>
//   );
// };

// export default ShiftDetails;

/* eslint-disable @typescript-eslint/no-floating-promises */
import React, { useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Calendar } from "@fullcalendar/core";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import styles from "./ShiftDetails.module.scss";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { IShiftDetailsObject } from "../../entities/types";
import useShiftDetails from "../../hooks/useShiftDetails";
import { handleMessages } from "../../../../shared/utils/UserManagementUtils";

const sunSVG = `
<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 24 24" fill="white">
  <path d="M6.76 4.84l-1.8-1.79-1.41 1.41 1.79 1.8 1.42-1.42zm10.45-.02l1.79-1.79-1.41-1.41-1.8 1.79 1.42 1.41zM12 4V1h-2v3h2zm8 8h3v-2h-3v2zM4 12H1v-2h3v2zm2.76 7.16l-1.79 1.79 1.41 1.41 1.8-1.79-1.42-1.41zm10.48 0l1.8 1.79 1.41-1.41-1.79-1.8-1.42 1.42zM12 23v-3h-2v3h2zm0-6a5 5 0 100-10 5 5 0 000 10z"/>
</svg>
`;

const moonSVG = `
<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 24 24" fill="white">
  <path d="M9.37 5.51A7 7 0 0012 19a7 7 0 006.49-4.37 8.5 8.5 0 01-9.12-9.12z"/>
</svg>
`;

const ShiftDetails = (): JSX.Element => {
  const navigate = useNavigate();
  const { project_id } = useParams();
  const { masterData, requestStatus, refetch } = useShiftDetails();

  const calendarRef = useRef<HTMLDivElement | null>(null);
  const calendarInstance = useRef<Calendar | null>(null);

  const projectId = Number(project_id);

  useEffect(() => {
    if (projectId) {
      refetch(projectId);
    }
  }, [projectId, refetch]);

  useEffect(() => {
    if (!calendarRef.current) return;

    // Destroy previous calendar
    calendarInstance.current?.destroy();

    calendarInstance.current = new Calendar(calendarRef.current, {
      plugins: [dayGridPlugin, interactionPlugin],
      initialView: "dayGridMonth",

      events: masterData.map((shift: IShiftDetailsObject) => ({
        id: String(shift.ID),
        title: shift.ShiftType,
        date: shift.ShiftDate,
        extendedProps: {
          shiftType: shift.ShiftType,
        },
      })),

      eventContent: (arg) => {
        const shiftType = arg.event.extendedProps.shiftType;

        return {
          html: `
            <div class="shift-box ${shiftType}" title="${shiftType}">
              ${shiftType === "Day" ? sunSVG : moonSVG}
            </div>
          `,
        };
      },

      eventClick: (info) => {
        const shiftType = info.event.extendedProps.shiftType.toLowerCase();
        const shiftId = info.event.id;

        navigate(
          `/projects/${project_id}/shift/${shiftId}/${shiftType}/techniques`
        );
      },
    });

    calendarInstance.current.render();

    return () => {
      calendarInstance.current?.destroy();
    };
  }, [masterData, navigate, project_id]);

  useEffect(() => {
    handleMessages(requestStatus);
  }, [requestStatus]);

  return (
    <div className={styles.operatorCon}>
      <div className={styles.header}>
        <KeyboardBackspaceIcon
          style={{ cursor: "pointer" }}
          onClick={() => navigate("/projects")}
        />
        <h1 className={styles.title}>Choose Shift</h1>
      </div>

      <div className={styles.body}>
        <div ref={calendarRef} />
      </div>
    </div>
  );
};

export default ShiftDetails;
