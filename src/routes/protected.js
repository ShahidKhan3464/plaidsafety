import { lazy } from 'react';
// Importing lazy-loaded components for different pages
const LayoutContent = lazy(() => import("layout"));
const Users = lazy(() => import("pages/users/list"));
const Settings = lazy(() => import("pages/settings"));
const Dashboard = lazy(() => import("pages/dashboard"));
const AddUser = lazy(() => import("pages/users/addUser"));
const HazardReports = lazy(() => import("pages/hazardReports/list"));
const RiskMatrix = lazy(() => import("pages/riskAssessment/matrix"));
const RiskAssessment = lazy(() => import("pages/riskAssessment/list"));
const NewRiskAssessment = lazy(() => import("pages/riskAssessment/new"));
const TaskRiskAssessment = lazy(() => import("pages/riskAssessment/task"));
const SafetyObservation = lazy(() => import("pages/safetyObservation/list"));
const SearchHazardReports = lazy(() => import("pages/hazardReports/search"));
const CreateHazardReports = lazy(() => import("pages/hazardReports/create"));
const SearchRiskAssessment = lazy(() => import("pages/riskAssessment/search"));
const CreateRiskAssessment = lazy(() => import("pages/riskAssessment/create"));
const ProjectRiskAssessment = lazy(() => import("pages/riskAssessment/project"));
const SearchSafetyObservation = lazy(() => import("pages/safetyObservation/search"));
const CreateSafetyObservation = lazy(() => import("pages/safetyObservation/create"));
const SafetyObservationLeaderboard = lazy(() => import("pages/safetyObservation/leaderboard"));
const AddCorrectiveActionForAssessment = lazy(() =>
    import("pages/riskAssessment/correctiveAction/add"));
const AddCorrectiveActionForReport = lazy(() =>
    import("pages/hazardReports/correctiveAction/add")
);
const UpdateCorrectiveActionForReport = lazy(() =>
    import("pages/hazardReports/correctiveAction/add")
);
const ListCorrectiveActionsReport = lazy(() =>
    import("pages/hazardReports/correctiveAction/list")
);
const AddCorrectiveActionForObservation = lazy(() =>
    import("pages/safetyObservation/correctiveAction/add")
);
const UpdateCorrectiveActionForObservation = lazy(() =>
    import("pages/safetyObservation/correctiveAction/add")
);
const ListCorrectiveActionsObservation = lazy(() =>
    import("pages/safetyObservation/correctiveAction/list")
);
const ListCorrectiveActionsAssessment = lazy(() =>
    import("pages/riskAssessment/correctiveAction/list")
);

// Array of protected routes
export const protectedRoutes = [
    {
        path: "/",
        permission: [],
        name: "/dashboard",
        authenticated: true,
        component: Dashboard,
        layout: LayoutContent,
    },
    {
        permission: [],
        name: "Dashboard",
        path: "/dashboard",
        authenticated: true,
        component: Dashboard,
        layout: LayoutContent,
    },
    {
        permission: [],
        authenticated: true,
        layout: LayoutContent,
        name: "Hazard-listing",
        component: HazardReports,
        path: "/hazard-reports/list",
    },
    {
        permission: [],
        authenticated: true,
        layout: LayoutContent,
        name: "Hazard-create",
        component: CreateHazardReports,
        path: "/hazard-reports/create",
    },
    {
        permission: [],
        authenticated: true,
        name: "Hazard-search",
        layout: LayoutContent,
        component: SearchHazardReports,
        path: "/hazard-reports/search",
    },
    {
        permission: [],
        authenticated: true,
        layout: LayoutContent,
        name: "Add-corrective-action",
        component: AddCorrectiveActionForReport,
        path: "/hazard-reports/add-corrective-action",
    },
    {
        permission: [],
        authenticated: true,
        layout: LayoutContent,
        name: "Update-corrective-action",
        component: UpdateCorrectiveActionForReport,
        path: "/hazard-reports/update-corrective-action/:id",
    },
    {
        permission: [],
        authenticated: true,
        layout: LayoutContent,
        name: "List-corrective-actions",
        component: ListCorrectiveActionsReport,
        path: "/hazard-reports/corrective-actions/:id",
    },
    {
        permission: [],
        authenticated: true,
        layout: LayoutContent,
        component: SafetyObservation,
        name: "SafetyObservation-list",
        path: "/safety-observations/list",
    },
    {
        permission: [],
        authenticated: true,
        name: "Safety-search",
        layout: LayoutContent,
        component: SearchSafetyObservation,
        path: "/safety-observations/search",
    },
    {
        permission: [],
        authenticated: true,
        layout: LayoutContent,
        name: "Safety-create",
        component: CreateSafetyObservation,
        path: "/safety-observations/create",
    },
    {
        permission: [],
        authenticated: true,
        layout: LayoutContent,
        name: "Safety-update    ",
        component: CreateSafetyObservation,
        path: "/safety-observations/update/:id",
    },
    {
        permission: [],
        authenticated: true,
        layout: LayoutContent,
        name: "Add-corrective-action",
        component: AddCorrectiveActionForObservation,
        path: "/safety-observations/add-corrective-action",
    },
    {
        permission: [],
        authenticated: true,
        layout: LayoutContent,
        name: "Update-corrective-action",
        component: UpdateCorrectiveActionForObservation,
        path: "/safety-observations/update-corrective-action/:id",
    },
    {
        permission: [],
        authenticated: true,
        layout: LayoutContent,
        name: "List-corrective-actions",
        component: ListCorrectiveActionsObservation,
        path: "/safety-observations/corrective-actions/:id",
    },
    {
        permission: [],
        authenticated: true,
        layout: LayoutContent,
        name: "Safety-observation-leaderboard",
        component: SafetyObservationLeaderboard,
        path: "/safety-observations/leaderboard",
    },
    {
        permission: [],
        authenticated: true,
        name: "Hazard-update",
        layout: LayoutContent,
        component: CreateHazardReports,
        path: "/hazard-reports/updateReport/:id",
    },
    {
        permission: [],
        authenticated: true,
        layout: LayoutContent,
        name: "Risk-assessment",
        component: RiskAssessment,
        path: "/risk-assessment/list",
    },
    {
        permission: [],
        name: "Risk-new",
        authenticated: true,
        layout: LayoutContent,
        component: NewRiskAssessment,
        path: "/risk-assessment/new",
    },
    {
        permission: [],
        name: "Risk-task",
        authenticated: true,
        layout: LayoutContent,
        component: TaskRiskAssessment,
        path: "/risk-assessment/task",
    },
    {
        permission: [],
        authenticated: true,
        name: "Risk-project",
        layout: LayoutContent,
        component: ProjectRiskAssessment,
        path: "/risk-assessment/project",
    },
    {
        permission: [],
        authenticated: true,
        name: "Risk-create",
        layout: LayoutContent,
        path: "/risk-assessment/create",
        component: CreateRiskAssessment,
    },
    {
        permission: [],
        authenticated: true,
        name: "Risk-search",
        layout: LayoutContent,
        path: "/risk-assessment/search",
        component: SearchRiskAssessment,
    },
    {
        permission: [],
        authenticated: true,
        layout: LayoutContent,
        name: "Add-corrective-action",
        component: AddCorrectiveActionForAssessment,
        path: "/risk-assessment/add-corrective-action",
    },
    {
        permission: [],
        authenticated: true,
        name: "Risk-matrix",
        layout: LayoutContent,
        component: RiskMatrix,
        path: "/risk-assessment/risk-matrix",
    },
    {
        permission: [],
        authenticated: true,
        layout: LayoutContent,
        name: "List-corrective-actions",
        component: ListCorrectiveActionsAssessment,
        path: "/risk-assessment/corrective-actions/:id",
    },
    {
        name: "Users",
        path: "/users",
        permission: [],
        component: Users,
        authenticated: true,
        layout: LayoutContent,
    },
    {
        permission: [],
        name: "AddUser",
        path: "/users/add",
        component: AddUser,
        authenticated: true,
        layout: LayoutContent,
    },
    {
        permission: [],
        name: "Settings",
        path: "/settings",
        component: Settings,
        authenticated: true,
        layout: LayoutContent,
    }
];
