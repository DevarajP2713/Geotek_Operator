/* eslint-disable react/self-closing-comp */
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Calendar } from "@fullcalendar/core"; // Core
import dayGridPlugin from "@fullcalendar/daygrid"; // Month/Day grid view
import timeGridPlugin from "@fullcalendar/timegrid"; // Week/Day views if needed
import interactionPlugin from "@fullcalendar/interaction"; // For selectable, drag/drop
import styles from "./ShiftDetails.module.scss";

const ShiftDetails = (): JSX.Element => {
  const { project_id, shift_id, shift_type } = useParams();

  console.log("project_id", project_id);
  console.log("shift_id", shift_id);
  console.log("shift_type", shift_type);

  useEffect(() => {
    const calendarEl = document.getElementById("calendar");

    if (calendarEl instanceof HTMLElement) {
      const calendar = new Calendar(calendarEl, {
        plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
        initialView: "dayGridMonth", // Use the plugin-specific view
      });

      calendar.render();
    }
  }, []);

  return (
    <div className={styles.operatorCon}>
      <div className={styles.header}>
        
        <h1 className={styles.title}>Choose Shift</h1>
      </div>
      <div className={styles.body}>
        <div id="calendar"></div>
      </div>
    </div>
  );
};

export default ShiftDetails;
