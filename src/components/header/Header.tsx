import { auth } from "firebase-app/init";
import { Dropdown } from "flowbite-react";
import { first, words } from "lodash";
import { currentUserActions } from "store/features/currentUserSlice";
import { useAppDispatch, useAppSelector } from "store/store";

export const Header = () => {
  const dispatch = useAppDispatch();
  const currentUser = useAppSelector((state) => state.currentUser.user);

  return (
    <header className="w-full bg-gray-50">
      <div className="max-w-screen-xl px-4 py-8 mx-auto sm:px-6 lg:px-8">
        <div className="flex items-center sm:justify-between sm:gap-4">
          <div className="relative hidden sm:block">
            <label className="sr-only" htmlFor="search">
              {" "}
              Search{" "}
            </label>

            <input
              className="w-full h-10 pl-4 pr-10 text-sm bg-white border-none rounded-lg shadow-sm sm:w-56"
              id="search"
              type="search"
              placeholder="Search bikes..."
            />

            <button
              className="absolute p-2 text-gray-600 transition -translate-y-1/2 rounded-md hover:text-gray-700 bg-gray-50 top-1/2 right-1"
              type="button"
              aria-label="Submit Search"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
              >
                <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
          </div>

          <div className="flex items-center justify-between flex-1 gap-8 sm:justify-end">
            <Dropdown
              inline={true}
              placement="bottom-end"
              label={
                <div className="flex items-center transition rounded-lg group shrink-0">
                  <img
                    alt="Man"
                    src="https://images.unsplash.com/photo-1600486913747-55e5470d6f40?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
                    className="object-cover w-10 h-10 rounded-full"
                  />

                  <p className="hidden ml-2 text-xs text-left sm:block">
                    <strong className="block font-medium">{currentUser.fullName}</strong>
                    <span className="text-gray-500"> {currentUser.email} </span>
                  </p>
                </div>
              }
            >
              <Dropdown.Item
                onClick={() => {
                  auth.signOut();
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
