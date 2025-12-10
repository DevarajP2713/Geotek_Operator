import ProjectLayout from "../modules/Operator/layout/operatorViewLayout/Layout";
import Projects from "../modules/Operator/pages/Projects/Projects";
import ShiftDetails from "../modules/Operator/pages/ShiftCalendar/ShiftDetails";
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
        routeName: "Project List",
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
          // /projects/:project_id/shift/:shift_id/:shift_type
          {
            routeName: "Shift Type",
            routePath: "shift/:shift_id/:shift_type", // "day" | "night"
            Component: null,
            indexRoute: false,
            individualRoute: false,
            hasChildren: true,
            children: [
              // /projects/:project_id/shift/:shift_id/:shift_type/techniques/:technique_id
              {
                routeName: "Technique",
                routePath: "techniques/:technique_id",
                Component: null,
                indexRoute: false,
                individualRoute: false,
                hasChildren: true,

                children: [
                  // /projects/:project_id/.../techniques/:technique_id/work_type
                  {
                    routeName: "Work Type",
                    routePath: "work_type",
                    Component: null,
                    indexRoute: false,
                    individualRoute: false,
                    hasChildren: true,

                    children: [
                      // /add_drilling
                      {
                        routeName: "Add Drilling",
                        routePath: "add_drilling",
                        Component: null,
                        indexRoute: false,
                        individualRoute: false,
                        hasChildren: true,

                        children: [
                          {
                            routeName: "Preview Drilling",
                            routePath: "preview",
                            Component: null,
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
                        Component: null,
                        indexRoute: false,
                        individualRoute: false,
                        hasChildren: true,

                        children: [
                          {
                            routeName: "Preview Production",
                            routePath: "preview",
                            Component: null,
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
    ],
  },
];
