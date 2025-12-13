/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import {
  // useState, useEffect,
  Suspense,
} from "react";
import { Layout } from "antd";
import { HashRouter, Route, Routes } from "react-router-dom";
import ErrorElement from "../../../shared/components/common/ErrorElement/ErrorElement";
// import { renderNestedRoutes } from "../../../shared/utils/RenderRoutes";
// import { routes } from "../../../routes/routes";
import Header from "../../../shared/components/common/Header/Header";
import ShiftDetails from "../../../modules/Operator/pages/ShiftCalendar/ShiftDetails";
import Projects from "../../../modules/Operator/pages/Projects/Projects";
import Techniques from "../../../modules/Operator/pages/Techniques/Techniques";
import WorkType from "../../../modules/Operator/pages/WorkType/WorkType";
import PredrillingForm from "../../../modules/Operator/components/PredrillingForm/PredrillingForm";
import ProductionForm from "../../../modules/Operator/components/ProductionForm/ProductionForm";
import Preview from "../../../modules/Operator/pages/Preview/Preview";

const GeotekOperator: React.FC<{ context: any }> = ({ context }) => {
  return (
    <HashRouter>
      <div
        style={{
          maxWidth: "1848px",
          // maxHeight: "2960px",
          marginLeft: "auto",
          marginRight: "auto",
          position: "relative",
          background: "#00235A",
          borderRadius: "10px",
        }}
      >
        <Suspense fallback={<div>Loading...</div>}>
          <Layout
            style={{
              background: "transparent",
            }}
          >
            <Header context={context} />
            <div
              style={{
                margin: "20px",
                border: "1px solid #00235A",
                borderRadius: "10px",
                background: "linear-gradient(90deg, #fff, #FFC5AE)",
                // height: "100vh",
              }}
            >
              <Routes>
                {/* {renderNestedRoutes(routes)} */}
                <Route path="/" element={<Projects />} />
                <Route path="/projects" element={<Projects />} />
                <Route
                  path="/projects/:project_id/shift"
                  element={<ShiftDetails />}
                />
                <Route
                  path="/projects/:project_id/shift/:shift_id/:shift_type/techniques"
                  element={<Techniques />}
                />
                <Route
                  path="/projects/:project_id/shift/:shift_id/:shift_type/techniques/:technique_id"
                  element={<WorkType />}
                />
                <Route
                  path="/projects/:project_id/shift/:shift_id/:shift_type/techniques/:technique_id/add_drilling"
                  element={<PredrillingForm />}
                />
                <Route
                  path="/projects/:project_id/shift/:shift_id/:shift_type/techniques/:technique_id/add_production"
                  element={<ProductionForm />}
                />
                <Route
                  path="/projects/:project_id/shift/:shift_id/:shift_type/techniques/:technique_id/add_drilling/preview"
                  element={<Preview />}
                />
                <Route
                  path="/projects/:project_id/shift/:shift_id/:shift_type/techniques/:technique_id/add_production/preview"
                  element={<Preview />}
                />
                <Route
                  path="*"
                  element={
                    <ErrorElement
                      ErrorMsg="Access Denied!"
                      subText="You don’t have permission to view this page. Please contact your administrator if you believe this is an error."
                      backLink={{
                        link: "/projects",
                        text: "Back to Home",
                      }}
                    />
                  }
                />
              </Routes>
            </div>
          </Layout>
        </Suspense>
      </div>
    </HashRouter>
  );
};

export default GeotekOperator;
