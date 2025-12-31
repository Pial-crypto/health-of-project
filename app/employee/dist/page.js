"use client";
"use strict";
exports.__esModule = true;
var navigation_1 = require("next/navigation");
var react_1 = require("react");
var components_1 = require("@/app/components");
var skeleton_1 = require("../components/skeleton");
var checkInhelpers_1 = require("@/lib/utils/checkInhelpers");
var useProtectedRoute_1 = require("@/lib/hooks/useProtectedRoute");
var mockProjects = [
    {
        id: "1",
        name: "E-commerce Platform Redesign",
        clientName: "Acme Corp",
        status: "on_track",
        healthScore: 82
    },
    {
        id: "3",
        name: "API Development & Integration",
        clientName: "Acme Corp",
        status: "critical",
        healthScore: 45
    },
];
var mockCheckIns = [
    {
        id: "1",
        projectId: "1",
        projectName: "E-commerce Platform Redesign",
        week: "2025-W08",
        progressSummary: "Completed UI mockups and started development",
        blockers: "Waiting for design assets from client",
        confidenceLevel: 4,
        completionPercentage: 35,
        createdAt: "2025-02-20T10:30:00Z"
    },
];
var mockRisks = [
    {
        id: "1",
        projectId: "3",
        projectName: "API Development & Integration",
        title: "Third-party Integration Delay",
        severity: "high",
        status: "open",
        createdAt: "2025-02-15T09:00:00Z"
    },
    {
        id: "2",
        projectId: "1",
        projectName: "E-commerce Platform Redesign",
        title: "Design Assets Delay",
        severity: "medium",
        status: "open",
        createdAt: "2025-02-10T14:00:00Z"
    },
];
function EmployeeDashboard() {
    var router = navigation_1.useRouter();
    var _a = react_1.useState(true), isLoading = _a[0], setIsLoading = _a[1];
    var _b = react_1.useState(null), user = _b[0], setUser = _b[1];
    var _c = react_1.useState([]), projects = _c[0], setProjects = _c[1];
    var _d = react_1.useState([]), risks = _d[0], setRisks = _d[1];
    var _e = react_1.useState([]), checkIns = _e[0], setCheckIns = _e[1];
    useProtectedRoute_1.useProtectedRoute(setUser, { employeeHome: true, setProjects: setProjects, setUser: setUser, setCheckIns: setCheckIns, setRisks: setRisks }, "employee", setIsLoading);
    if (isLoading)
        return React.createElement(skeleton_1.SkeletonList, null);
    if (!user)
        return null;
    var openRisks = risks.filter(function (r) { return r.solved; });
    var pendingCheckIns = checkIns;
    var thisWeekCount = openRisks.filter(function (risk) { return checkInhelpers_1.isCurrentWeek(risk.timeStamp); }).length + checkIns.filter(function (checkIn) { return checkInhelpers_1.isCurrentWeek(checkIn.timeStamp); }).length;
    return (React.createElement("div", null,
        React.createElement("div", { className: "mb-8" },
            React.createElement("h1", { className: "text-4xl font-bold text-gray-900 mb-2" },
                "Welcome, ",
                user.name),
            React.createElement("p", { className: "text-gray-600 text-lg" }, "Monitor your assigned projects and submit progress")),
        React.createElement("div", { className: "grid grid-cols-1 md:grid-cols-4 gap-4 mb-8" },
            React.createElement(components_1.Card, null,
                React.createElement(components_1.CardBody, { className: "text-center" },
                    React.createElement("div", { className: "text-3xl font-bold text-blue-600 mb-1" }, projects.length),
                    React.createElement("p", { className: "text-sm text-gray-600" }, "Assigned Projects"))),
            React.createElement(components_1.Card, null,
                React.createElement(components_1.CardBody, { className: "text-center" },
                    React.createElement("div", { className: "text-3xl font-bold text-yellow-600 mb-1" }, checkIns.length),
                    React.createElement("p", { className: "text-sm text-gray-600" }, "Pending Check-ins"))),
            React.createElement(components_1.Card, null,
                React.createElement(components_1.CardBody, { className: "text-center" },
                    React.createElement("div", { className: "text-3xl font-bold text-red-600 mb-1" }, openRisks.length),
                    React.createElement("p", { className: "text-sm text-gray-600" }, "Open Risks"))),
            React.createElement(components_1.Card, null,
                React.createElement(components_1.CardBody, { className: "text-center" },
                    React.createElement("div", { className: "text-3xl font-bold text-green-600 mb-1" }, thisWeekCount),
                    React.createElement("p", { className: "text-sm text-gray-600" }, "This Week")))),
        React.createElement("div", { className: "mb-8" },
            React.createElement("h2", { className: "text-2xl font-bold text-gray-900 mb-4" }, "Recent Check-ins"),
            checkIns.length === 0 ? (React.createElement(components_1.Card, null,
                React.createElement(components_1.CardBody, null,
                    React.createElement(components_1.EmptyState, { title: "No Check-ins Yet", description: "Submit your first weekly check-in to get started", action: {
                            label: "Submit Check-in",
                            href: "/employee/check-ins"
                        } })))) : (React.createElement("div", { className: "space-y-3" }, checkIns.slice(0, 4).map(function (checkIn) { return (React.createElement(components_1.Card, { key: checkIn._id, hover: true },
                React.createElement(components_1.CardBody, null,
                    React.createElement("div", { className: "flex items-start justify-between" },
                        React.createElement("div", { className: "flex-1" },
                            React.createElement("h3", { className: "font-semibold text-gray-900 mb-1" }, checkIn.projectName),
                            React.createElement("p", { className: "text-sm text-gray-600 mb-2" }, checkIn.progressSummary),
                            React.createElement("div", { className: "flex gap-4 text-xs text-gray-600" },
                                React.createElement("span", null,
                                    "Confidence: ",
                                    checkIn.confidenceLevel,
                                    "/5"),
                                React.createElement("span", null,
                                    "Progress: ",
                                    checkIn.completionPercentage,
                                    "%"),
                                React.createElement("span", null, new Date(checkIn.timeStamp).toLocaleDateString()))))))); })))),
        React.createElement("div", { className: "mb-8" },
            React.createElement("h2", { className: "text-2xl font-bold text-gray-900 mb-4" }, "Latest Open Risks"),
            openRisks.length === 0 ? (React.createElement(components_1.Card, null,
                React.createElement(components_1.CardBody, { className: "text-center py-8" },
                    React.createElement("p", { className: "text-gray-600" }, "No open risks \u2713")))) : (React.createElement("div", { className: "space-y-3" }, openRisks.slice(0, 4).map(function (risk) { return (React.createElement(components_1.Card, { key: risk._id, className: "border-l-4 border-red-600" },
                React.createElement(components_1.CardBody, null,
                    React.createElement("div", { className: "flex items-start justify-between" },
                        React.createElement("div", { className: "flex-1" },
                            React.createElement("div", { className: "flex items-center gap-2 mb-1" },
                                React.createElement("h3", { className: "font-semibold text-gray-900" }, risk.title),
                                React.createElement("span", { className: "text-xs font-semibold px-2 py-1 rounded " + (risk.severity === "high"
                                        ? "bg-red-100 text-red-800"
                                        : risk.severity === "medium"
                                            ? "bg-yellow-100 text-yellow-800"
                                            : "bg-blue-100 text-blue-800") }, risk.severity.toUpperCase())),
                            React.createElement("p", { className: "text-sm text-gray-600 mb-1" },
                                "Project: ",
                                risk.projectName),
                            React.createElement("p", { className: "text-xs text-gray-500" },
                                "Created: ",
                                new Date(risk.timeStamp).toLocaleDateString())))))); })))),
        React.createElement("div", null,
            React.createElement("h2", { className: "text-2xl font-bold text-gray-900 mb-4" }, "Recently Assigned Projects"),
            React.createElement("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4" }, (projects === null || projects === void 0 ? void 0 : projects.length) > 0 ? (projects.slice(0, 4).map(function (project) {
                var _a;
                return (React.createElement(components_1.Card, { key: project._id, hover: true },
                    React.createElement(components_1.CardBody, null,
                        React.createElement("h3", { className: "font-semibold text-gray-900 mb-1" }, project.name),
                        React.createElement("p", { className: "text-sm text-gray-600 mb-3" },
                            "Start Date: ",
                            new Date(project.startDate).toLocaleDateString()),
                        React.createElement("p", { className: "text-sm text-gray-600 mb-3" },
                            "Client: ",
                            project.clientEmail || project.clientName),
                        React.createElement("p", { className: "text-sm text-gray-600 mb-3" },
                            "Admin: ",
                            project.adminName),
                        React.createElement("p", { className: "text-sm text-gray-600 mb-3" },
                            "End Date: ",
                            new Date(project.endDate).toLocaleDateString()),
                        React.createElement("p", { className: "text-sm text-gray-600 mb-3" },
                            "Team Size: ",
                            ((_a = project.employeeList) === null || _a === void 0 ? void 0 : _a.length) || 0))));
            })) : (React.createElement(components_1.Card, null,
                React.createElement(components_1.CardBody, { className: "text-center py-8" },
                    React.createElement(components_1.EmptyState, { title: "No Projects Assigned", description: "No projects assigned to you yet" }))))))));
}
exports["default"] = EmployeeDashboard;
