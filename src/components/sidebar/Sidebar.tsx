import { SIDEBAR_ROUTES } from "constants/routes";
import { Avatar } from "flowbite-react";
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
    <div className="flex flex-col justify-between w-full bg-white border-r md:min-h-screen lg:w-fit">
      <div className="flex flex-col">
        <span className="w-full py-5 mx-auto font-bold text-center bg-gray-200 rounded-lg text-md">BikeRentals</span>

        <div className="px-1">
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
      </div>
      <div className="sticky inset-x-0 bottom-0 border-t border-gray-100">
        <a className="flex items-center p-4 bg-white hover:bg-gray-50 shrink-0">
          <Avatar rounded={true} />
          <div className="ml-1.5">
            <p className="mr-10 text-xs">
              <strong className="block font-medium">{currentUser.fullName}</strong>
            </p>
          </div>
        </a>
      </div>
    </div>
  );
};
