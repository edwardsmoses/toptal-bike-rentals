import { auth } from "firebase-app/init";
import { Avatar, Dropdown } from "flowbite-react";
import { first, words } from "lodash";
import { useRouter } from "next/router";
import { currentUserActions } from "store/features/currentUserSlice";
import { useAppDispatch, useAppSelector } from "store/store";
import { FilterMenu } from "./FilterMenu";

export const Header = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const currentUser = useAppSelector((state) => state.currentUser.user);

  return (
    <header className="w-full bg-gray-50">
      <div className="max-w-screen-xl px-4 py-8 mx-auto sm:px-6 lg:px-8">
        <div className="flex items-center justify-between w-full gap-4">
          <div className="relative">
            {/* Only Display the Filter menu for 'User' role */}
            {currentUser.role === "user" && <FilterMenu />}
          </div>

          <div className="flex items-center justify-between gap-8 sm:justify-end">
            <Dropdown
              inline={true}
              placement="bottom-end"
              label={
                <div className="flex items-center transition rounded-lg group shrink-0">
                  <Avatar rounded={true} />

                  <p className="hidden ml-2 text-xs text-left sm:block">
                    <strong className="block font-medium">{currentUser.fullName}</strong>
                    <span className="text-gray-500"> {currentUser.email} </span>
                  </p>
                </div>
              }
            >
              <Dropdown.Item
                onClick={async () => {
                  await auth.signOut();
                  dispatch(currentUserActions.resetCurrentUser());
                }}
              >
                Sign Out
              </Dropdown.Item>
            </Dropdown>
          </div>
        </div>

        <div className="mt-8">
          <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
            Welcome Back, {first(words(currentUser.fullName))}!
          </h1>

          <p className="mt-1.5 text-sm text-gray-500">Get on the road - Make a reservation today 🚀</p>
        </div>
      </div>
    </header>
  );
};
