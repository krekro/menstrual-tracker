import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [index("routes/login.tsx"), route("/dashboard", "routes/dashboard.tsx"), route("/records", "routes/records.tsx")] satisfies RouteConfig;
