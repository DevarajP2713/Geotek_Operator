import PredrillingForm from "../modules/Operator/components/PredrillingForm/PredrillingForm";
import ProductionForm from "../modules/Operator/components/ProductionForm/ProductionForm";
import ProjectLayout from "../modules/Operator/layout/operatorViewLayout/Layout";
import Preview from "../modules/Operator/pages/Preview/Preview";
import Projects from "../modules/Operator/pages/Projects/Projects";
import ShiftDetails from "../modules/Operator/pages/ShiftCalendar/ShiftDetails";
import Techniques from "../modules/Operator/pages/Techniques/Techniques";
import WorkType from "../modules/Operator/pages/WorkType/WorkType";
import { OperatorRoutesProps } from "../types/Types";

export const routes: OperatorRoutesProps[] = [
  {
    routeName: "Projects",
    routePath: "/",
    Component: Projects,
    indexRoute: false,
    individualRoute: false,
    hasChildren: false,
    children: [],
  },
  {
    routeName: "Projects",
    routePath: "/projects",
    Component: ProjectLayout,
    indexRoute: false,
    individualRoute: false,
    hasChildren: true,
    children: [
      // /projects
      {
        routeName: "Projects",
        routePath: "",
        Component: Projects,
        indexRoute: true,
        individualRoute: false,
        hasChildren: false,
        children: [],
      },

      // /projects/:project_id
      {
        routeName: "Shift Details",
        routePath: ":project_id",
        Component: ShiftDetails,
        indexRoute: false,
        individualRoute: false,
        hasChildren: true,
        children: [
          // /projects/:project_id/shift/:shift_id/:shift_type/techniques
          {
            routeName: "Techniques",
            routePath: "shift/:shift_id/:shift_type/techniques",
            Component: Techniques,
            indexRoute: true,
            individualRoute: false,
            hasChildren: true,
            children: [
              // /projects/:project_id/shift/:shift_id/:shift_type/techniques/:technique_id
              {
                routeName: "WorkType",
                routePath: ":technique_id",
                Component: WorkType,
                indexRoute: true,
                individualRoute: false,
                hasChildren: true,
                children: [
                  // /add_drilling
                  {
                    routeName: "Add Drilling",
                    routePath: "add_drilling",
                    Component: PredrillingForm,
                    indexRoute: true,
                    individualRoute: false,
                    hasChildren: true,
                    children: [
                      {
                        routeName: "Preview Drilling",
                        routePath: "preview",
                        Component: Preview,
                        indexRoute: false,
                        individualRoute: false,
                        hasChildren: false,
                        children: [],
                      },
                    ],
                  },

                  // /add_production
                  {
                    routeName: "Add Production",
                    routePath: "add_production",
                    Component: ProductionForm,
                    indexRoute: true,
                    individualRoute: false,
                    hasChildren: true,
                    children: [
                      {
                        routeName: "Preview Production",
                        routePath: "preview",
                        Component: Preview,
                        indexRoute: false,
                        individualRoute: false,
                        hasChildren: false,
                        children: [],
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
];
