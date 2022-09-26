import { UserRole } from "models/model";

type SidebarRouteType = {
  routeLabel: string;
  route: string;
};

const ADMIN_SIDEBAR_ROUTES: SidebarRouteType[] = [
  {
    route: "/admin/",
    routeLabel: "Dashboard",
  },
  {
    route: "/admin/bikes",
    routeLabel: "Bikes",
  },
  {
    route: "/admin/users",
    routeLabel: "Users",
  },
];

const USER_SIDEBAR_ROUTES: SidebarRouteType[] = [
  {
    route: "/users/",
    routeLabel: "All Bikes",
  },
  {
    route: "/users/reservations",
    routeLabel: "My Reservations",
  },
];

export const SIDEBAR_ROUTES: Record<UserRole, SidebarRouteType[]> = {
  manager: ADMIN_SIDEBAR_ROUTES,
  user: USER_SIDEBAR_ROUTES,
};
