import { SIDEBAR_ROUTES } from "constants/routes";
import { map } from "lodash";
import Link from "next/link";
import { useRouter } from "next/router";
import { useAppSelector } from "store/store";

export const Sidebar = () => {
  const currentUser = useAppSelector((state) => state.currentUser.user);
  const router = useRouter();

  const sidebarRoutes = SIDEBAR_ROUTES[currentUser.role!];

  const currentRoute = `/${router.pathname.split("/")[1]}/${router.pathname.split("/")[2] || ""}`;

  return (
    <div className="flex flex-col justify-between h-screen bg-white border-r w-fit">
      <div className="px-4 py-6">
        <span className="block w-32 h-10 bg-gray-200 rounded-lg"></span>

        <nav className="flex flex-col mt-6 space-y-1">
          {map(sidebarRoutes, (route) => {
            const isCurrentRoute = currentRoute === route.route;
            return (
              <Link href={route.route} key={route.route}>
                <a
                  className={`flex items-center px-4 py-2 text-gray-700  rounded-lg 
                  ${isCurrentRoute ? "bg-gray-100 font-bold" : ""}`}
                >
                  <span className={`ml-3 text-sm font-medium ${isCurrentRoute ? "font-bold" : ""}`}>
                    {route.routeLabel}
                  </span>
                </a>
              </Link>
            );
          })}
        </nav>
      </div>
      <div className="sticky inset-x-0 bottom-0 border-t border-gray-100">
        <a className="flex items-center p-4 bg-white hover:bg-gray-50 shrink-0">
          <img
            alt="Man"
            src="https://images.unsplash.com/photo-1600486913747-55e5470d6f40?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
            className="object-cover w-10 h-10 rounded-full"
          />

          <div className="ml-1.5">
            <p className="text-xs">
              <strong className="block font-medium">{currentUser.fullName}</strong>
              <span className="mr-10"> {currentUser.email} </span>
            </p>
          </div>
        </a>
      </div>
    </div>
  );
};
