"use client";
"use strict";
exports.__esModule = true;
var react_1 = require("react");
var navigation_1 = require("next/navigation");
var useProtectedRoute_1 = require("@/lib/hooks/useProtectedRoute");
var material_1 = require("@mui/material");
function AdminDashboard() {
    var router = navigation_1.useRouter();
    var _a = react_1.useState(null), user = _a[0], setUser = _a[1];
    var _b = react_1.useState(true), isLoading = _b[0], setIsLoading = _b[1];
    isLoading && React.createElement(material_1.Skeleton, null);
    useProtectedRoute_1.useProtectedRoute(setUser, {}, "admin", setIsLoading);
    react_1.useEffect(function () {
        // Redirect to /admin/projects after component mounts
        router.push("/admin/projects");
    }, [router]);
    return (React.createElement("div", { className: "flex items-center justify-center min-h-screen bg-gray-50" },
        React.createElement("div", { className: "text-center p-6 bg-white rounded-lg shadow-md" },
            React.createElement("h1", { className: "text-2xl font-semibold mb-2" }, "Redirecting..."),
            React.createElement("p", { className: "text-gray-600" }, "You are being redirected to the projects page."))));
}
exports["default"] = AdminDashboard;
