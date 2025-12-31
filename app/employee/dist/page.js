"use client";
"use strict";
exports.__esModule = true;
var react_1 = require("react");
var components_1 = require("@/app/components");
var Skeleton_1 = require("../components/Skeleton");
var checkInhelpers_1 = require("@/lib/utils/checkInhelpers");
var useProtectedRoute_1 = require("@/lib/hooks/useProtectedRoute");
function EmployeeDashboard() {
    var _a = react_1.useState(true), isLoading = _a[0], setIsLoading = _a[1];
    var _b = react_1.useState(null), user = _b[0], setUser = _b[1];
    var _c = react_1.useState([]), projects = _c[0], setProjects = _c[1];
    var _d = react_1.useState([]), risks = _d[0], setRisks = _d[1];
    var _e = react_1.useState([]), checkIns = _e[0], setCheckIns = _e[1];
    useProtectedRoute_1.useProtectedRoute(setUser, { employeeHome: true, setProjects: setProjects, setUser: setUser, setCheckIns: setCheckIns, setRisks: setRisks }, "employee", setIsLoading);
    if (isLoading)
        return React.createElement(Skeleton_1.SkeletonList, null);
    if (!user)
        return null;
    var openRisks = risks.filter(function (r) { return r.solved; });
    var thisWeekCount = openRisks.filter(function (risk) { return checkInhelpers_1.isCurrentWeek(risk.timeStamp); }).length + checkIns.filter(function (checkIn) { return checkInhelpers_1.isCurrentWeek(checkIn.timeStamp); }).length;
    return (React.createElement("div", null,
        React.createElement("div", { className: "mb-8" },
            React.createElement("h1", { className: "text-4xl font-bold text-gray-900 mb-2" },
                "Welcome, ",
                user.name),
            React.createElement("p", { className: "text-gray-600 text-lg" }, "Monitor your assigned projects and submit progress")),
        React.createElement("div", { className: "grid grid-cols-1 md:grid-cols-4 gap-4 mb-8" },
            React.createElement(components_1.Card, { className: "rounded-2xl shadow-lg hover:shadow-xl transition-all" },
                React.createElement(components_1.CardBody, { className: "text-center p-6" },
                    React.createElement("div", { className: "text-4xl font-bold text-blue-600 mb-2 flex justify-center items-center gap-2" },
                        "\uD83D\uDCC1 ",
                        projects.length),
                    React.createElement("p", { className: "text-sm text-gray-600 uppercase tracking-wide" }, "Assigned Projects"))),
            React.createElement(components_1.Card, { className: "rounded-2xl shadow-lg hover:shadow-xl transition-all" },
                React.createElement(components_1.CardBody, { className: "text-center p-6" },
                    React.createElement("div", { className: "text-4xl font-bold text-yellow-600 mb-2 flex justify-center items-center gap-2" },
                        "\u23F3 ",
                        checkIns.length),
                    React.createElement("p", { className: "text-sm text-gray-600 uppercase tracking-wide" }, "Total Check-ins"))),
            React.createElement(components_1.Card, { className: "rounded-2xl shadow-lg hover:shadow-xl transition-all" },
                React.createElement(components_1.CardBody, { className: "text-center p-6" },
                    React.createElement("div", { className: "text-4xl font-bold text-red-600 mb-2 flex justify-center items-center gap-2" },
                        "\u26A0\uFE0F ",
                        openRisks.length),
                    React.createElement("p", { className: "text-sm text-gray-600 uppercase tracking-wide" }, "Open Risks"))),
            React.createElement(components_1.Card, { className: "rounded-2xl shadow-lg hover:shadow-xl transition-all" },
                React.createElement(components_1.CardBody, { className: "text-center p-6" },
                    React.createElement("div", { className: "text-4xl font-bold text-green-600 mb-2 flex justify-center items-center gap-2" },
                        "\uD83D\uDCC5 ",
                        thisWeekCount),
                    React.createElement("p", { className: "text-sm text-gray-600 uppercase tracking-wide" }, "This Week")))),
        React.createElement("div", { className: "mb-8" },
            React.createElement("h2", { className: "text-2xl font-bold text-gray-900 mb-4" }, "Recent Check-ins"),
            checkIns.length === 0 ? (React.createElement(components_1.Card, null,
                React.createElement(components_1.CardBody, null,
                    React.createElement(components_1.EmptyState, { title: "No Check-ins Yet", description: "Submit your first weekly check-in to get started", action: {
                            label: "Submit Check-in",
                            href: "/employee/check-ins"
                        } })))) : (React.createElement("div", { className: "space-y-3" }, checkIns.slice(0, 4).map(function (checkIn) { return (React.createElement(components_1.Card, { key: checkIn._id, hover: true },
                React.createElement(components_1.CardBody, { className: "p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all" },
                    React.createElement("div", { className: "flex items-start justify-between" },
                        React.createElement("div", { className: "flex-1" },
                            React.createElement("h3", { className: "text-xl font-bold text-gray-900 mb-2 flex items-center gap-2" },
                                "\uD83D\uDE80 ",
                                checkIn.projectName),
                            React.createElement("p", { className: "text-base text-gray-700 mb-3" }, checkIn.progressSummary),
                            React.createElement("div", { className: "flex flex-wrap gap-4 text-sm text-gray-600" },
                                React.createElement("span", { className: "flex items-center gap-1" },
                                    "\uD83D\uDCAA Confidence: ",
                                    React.createElement("span", { className: "font-semibold text-gray-900" },
                                        checkIn.confidenceLevel,
                                        "/5")),
                                React.createElement("span", { className: "flex items-center gap-1" },
                                    "\uD83D\uDCC8 Progress: ",
                                    React.createElement("span", { className: "font-semibold text-gray-900" },
                                        checkIn.completionPercentage,
                                        "%")),
                                React.createElement("span", { className: "flex items-center gap-1" },
                                    "\uD83D\uDD52 ",
                                    new Date(checkIn.timeStamp).toLocaleDateString()))))))); })))),
        React.createElement("div", { className: "mb-8" },
            React.createElement("h2", { className: "text-2xl font-bold text-gray-900 mb-4" }, "Latest Open Risks"),
            openRisks.length === 0 ? (React.createElement(components_1.Card, null,
                React.createElement(components_1.CardBody, { className: "text-center py-8" },
                    React.createElement("p", { className: "text-gray-600" }, "No open risks \u2713")))) : (React.createElement("div", { className: "space-y-3" }, openRisks.slice(0, 4).map(function (risk) { return (React.createElement(components_1.Card, { key: risk._id, className: "border-l-4 border-red-600" },
                React.createElement(components_1.CardBody, { className: "p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all" },
                    React.createElement("div", { className: "flex items-start justify-between" },
                        React.createElement("div", { className: "flex-1" },
                            React.createElement("div", { className: "flex items-center gap-3 mb-2" },
                                React.createElement("h3", { className: "text-xl font-bold text-gray-900 flex items-center gap-2" },
                                    "\u26A0\uFE0F ",
                                    risk.title),
                                React.createElement("span", { className: "text-xs font-semibold px-3 py-1 rounded-full " + (risk.severity === "high"
                                        ? "bg-red-100 text-red-800"
                                        : risk.severity === "medium"
                                            ? "bg-yellow-100 text-yellow-800"
                                            : "bg-blue-100 text-blue-800") }, risk.severity.toUpperCase())),
                            React.createElement("p", { className: "text-base text-gray-700 mb-1 flex items-center gap-2" },
                                "\uD83D\uDCCC Project: ",
                                React.createElement("span", { className: "font-semibold" }, risk.projectName)),
                            React.createElement("p", { className: "text-sm text-gray-500 flex items-center gap-2" },
                                "\uD83D\uDD52 Created: ",
                                new Date(risk.timeStamp).toLocaleDateString())))))); })))),
        React.createElement("div", null,
            React.createElement("h2", { className: "text-2xl font-bold text-gray-900 mb-4" }, "Recently Assigned Projects"),
            React.createElement("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4" }, (projects === null || projects === void 0 ? void 0 : projects.length) > 0 ? (projects.slice(0, 4).map(function (project) {
                var _a;
                return (React.createElement(components_1.Card, { key: project._id, hover: true },
                    React.createElement(components_1.CardBody, { className: "p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all" },
                        React.createElement("h3", { className: "text-2xl font-bold text-gray-900 mb-3 flex items-center gap-2" },
                            "\uD83D\uDE80 ",
                            project.name),
                        React.createElement("div", { className: "space-y-2 text-gray-700" },
                            React.createElement("p", { className: "text-base flex items-center gap-2" },
                                "\uD83D\uDCC5 Start Date: ",
                                React.createElement("span", { className: "font-semibold text-green-700" }, new Date(project.startDate).toLocaleDateString())),
                            React.createElement("p", { className: "text-base flex items-center gap-2" },
                                "\uD83C\uDFE2 Client: ",
                                React.createElement("span", { className: "font-semibold text-blue-700" }, project.clientEmail || project.clientName)),
                            React.createElement("p", { className: "text-base flex items-center gap-2" },
                                "\uD83D\uDC64 Admin: ",
                                React.createElement("span", { className: "font-semibold text-purple-700" }, project.adminName)),
                            React.createElement("p", { className: "text-base flex items-center gap-2" },
                                "\uD83D\uDED1 End Date: ",
                                React.createElement("span", { className: "font-semibold text-red-700" }, new Date(project.endDate).toLocaleDateString())),
                            React.createElement("p", { className: "text-base flex items-center gap-2" },
                                "\uD83D\uDC65 Team Size: ",
                                React.createElement("span", { className: "font-semibold text-indigo-700" }, ((_a = project.employeeList) === null || _a === void 0 ? void 0 : _a.length) || 0))))));
            })) : (React.createElement(components_1.Card, null,
                React.createElement(components_1.CardBody, { className: "text-center py-8" },
                    React.createElement(components_1.EmptyState, { title: "No Projects Assigned", description: "No projects assigned to you yet" }))))))));
}
exports["default"] = EmployeeDashboard;
