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
                <Route path="/shift" element={<ShiftDetails />} />

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
