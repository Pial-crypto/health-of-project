"use client";
"use strict";
exports.__esModule = true;
var navigation_1 = require("next/navigation");
var react_1 = require("react");
var components_1 = require("@/app/components");
var lucide_react_1 = require("lucide-react");
var skeleton_1 = require("../components/skeleton.tsx");
var useProtectedRoute_1 = require("@/lib/hooks/useProtectedRoute");
function ClientDashboard() {
    var router = navigation_1.useRouter();
    var _a = react_1.useState(null), user = _a[0], setUser = _a[1];
    var _b = react_1.useState(true), isLoading = _b[0], setIsLoading = _b[1];
    var _c = react_1.useState([]), projects = _c[0], setProjects = _c[1];
    var _d = react_1.useState([]), feedbacks = _d[0], setFeedbacks = _d[1];
    //console.log(user,"dsfafasdfsad")
    useProtectedRoute_1.useProtectedRoute(setUser, { clientHome: true, setFeedbacks: setFeedbacks, setProjects: setProjects }, "client", setIsLoading);
    if (isLoading)
        return React.createElement(skeleton_1.SkeletonList, null);
    if (!user)
        return null;
    // console.log("Projects:", projects);
    var flaggedFeedback = feedbacks.filter(function (f) { return f.flaggedIssue; });
    return (React.createElement("div", { className: "container mx-auto px-4 py-8" },
        React.createElement("div", { className: "mb-8" },
            React.createElement("h1", { className: "text-3xl md:text-4xl font-bold text-gray-900 mb-2" },
                "Welcome, ",
                user.name),
            React.createElement("p", { className: "text-gray-600 text-lg" }, "Monitor your projects and provide feedback")),
        React.createElement("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8" },
            React.createElement(components_1.Card, null,
                React.createElement(components_1.CardBody, { className: "text-center" },
                    React.createElement("div", { className: "text-3xl font-bold text-blue-600" }, projects.length),
                    React.createElement("p", { className: "text-sm text-gray-600" }, "Assigned Projects"))),
            React.createElement(components_1.Card, null,
                React.createElement(components_1.CardBody, { className: "text-center" },
                    React.createElement("div", { className: "text-3xl font-bold text-red-600" }, flaggedFeedback.length),
                    React.createElement("p", { className: "text-sm text-gray-600" }, "Flagged Issues"))),
            React.createElement(components_1.Card, null,
                React.createElement(components_1.CardBody, { className: "text-center" },
                    React.createElement("div", { className: "text-3xl font-bold text-green-600" }, feedbacks.length),
                    React.createElement("p", { className: "text-sm text-gray-600" }, "Feedback Submitted")))),
        React.createElement("div", null,
            React.createElement("h2", { className: "text-2xl font-bold mb-4" }, "Recently Assigned"),
            React.createElement("div", { className: "grid md:grid-cols-2 gap-4" }, projects.slice(0, 4).map(function (project) { return (
            // <Link key={project._id} href={`/client/projects/${project._id}`}>
            React.createElement(components_1.Card, { key: project._id, hover: true, className: "shadow-sm transition-transform hover:shadow-md" },
                React.createElement(components_1.CardBody, null,
                    React.createElement("h3", { className: "font-semibold" }, project.name),
                    React.createElement("p", { className: "text-sm text-gray-600" }, project.description)))); }))),
        React.createElement("div", { className: "h-2" }),
        React.createElement("div", { className: "h-2" }),
        React.createElement("div", { className: "mb-8" },
            React.createElement("h2", { className: "text-2xl font-bold mb-4" }, "Recent Feedback"),
            feedbacks.length === 0 ? (React.createElement(components_1.Card, null,
                React.createElement(components_1.CardBody, null,
                    React.createElement(components_1.EmptyState, { title: "No Feedback Yet", description: "Submit your first weekly feedback" })))) : (feedbacks.slice(0, 4).map(function (feedback) {
                var _a;
                return (React.createElement(components_1.Card, { key: feedback._id, className: "mb-3 shadow-sm" },
                    React.createElement(components_1.CardBody, { className: "space-y-3" },
                        React.createElement("div", { className: "flex items-start justify-between gap-3" },
                            React.createElement("div", { className: "flex items-center gap-2" },
                                React.createElement("div", { className: "flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50 text-blue-500" }),
                                React.createElement("div", null,
                                    React.createElement("h3", { className: "font-semibold text-gray-900" }, ((_a = projects.find(function (p) { return p._id === feedback.projectId; })) === null || _a === void 0 ? void 0 : _a.name) ||
                                        "Unknown project"),
                                    React.createElement("p", { className: "flex items-center gap-1 text-xs text-gray-500" },
                                        React.createElement(lucide_react_1.CalendarDays, { className: "h-3 w-3" }),
                                        new Date(feedback.timeStamp).toLocaleDateString())))),
                        React.createElement("p", { className: "text-sm text-gray-700" }, feedback.comment || "No comment provided."),
                        React.createElement("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm" },
                            React.createElement("div", { className: "flex items-center gap-2" },
                                React.createElement("span", { className: "inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-1 text-xs font-medium text-emerald-700" },
                                    React.createElement(lucide_react_1.Star, { className: "h-3 w-3 fill-emerald-400 text-emerald-400" }),
                                    "Satisfaction"),
                                React.createElement("span", { className: "font-medium text-gray-900" },
                                    feedback.satisfactionRating,
                                    "/5")),
                            React.createElement("div", { className: "flex items-center gap-2" },
                                React.createElement("span", { className: "inline-flex items-center gap-1 rounded-full bg-indigo-50 px-2 py-1 text-xs font-medium text-indigo-700" },
                                    React.createElement(lucide_react_1.Star, { className: "h-3 w-3 fill-indigo-400 text-indigo-400" }),
                                    "Communication"),
                                React.createElement("span", { className: "font-medium text-gray-900" },
                                    feedback.communicationClarity,
                                    "/5"))),
                        React.createElement("div", { className: "mt-1" },
                            React.createElement("p", { className: "text-xs font-semibold text-gray-500 mb-1" }, "Reported Issue"),
                            feedback.issueDescription ? (React.createElement("div", { className: "flex items-start gap-2 rounded-md bg-amber-50 px-3 py-2 text-xs text-amber-800 border border-amber-200" },
                                React.createElement(lucide_react_1.AlertTriangle, { className: "mt-0.5 h-3.5 w-3.5 flex-shrink-0" }),
                                React.createElement("span", null, feedback.issueDescription))) : (React.createElement("p", { className: "text-xs text-gray-500" }, "No issue reported."))))));
            })))));
}
exports["default"] = ClientDashboard;
