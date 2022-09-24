import { UserLayout } from "components/layout/UserLayout";
import { map } from "lodash";
import Link from "next/link";
import { useAppSelector } from "store/store";

const Dashboard = () => {
  const allBikes = useAppSelector((state) => state.bikes.allBikes);

  return (
    <UserLayout>
      <div className="p-10">
        <h3 className="font-sans text-2xl font-medium">All Bikes</h3>

        {map(allBikes, (bike) => {
          return (
            <div className="grid grid-cols-2 mt-8 lg:grid-cols-4 gap-x-4 gap-y-8" key={bike.id}>
              <Link href={`/bikes/${bike.id}`}>
                <a className="relative block overflow-hidden bg-center bg-no-repeat bg-cover rounded-xl bg-[url(https://images.unsplash.com/photo-1552832230-c0197dd311b5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1592&q=80)]">
                  <span className="absolute z-10 inline-flex items-center px-3 py-1 text-xs font-semibold text-white bg-black rounded-full right-4 top-4">
                    {bike.rating}

                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 ml-1.5 text-yellow-300"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  </span>

                  <div className="relative p-8 pt-40 text-white bg-black bg-opacity-40">
                    <h5 className="text-2xl font-bold">
                      {bike.model}, {bike.color}
                    </h5>
                    <p className="text-sm">{bike.location}</p>
                  </div>
                </a>
              </Link>
            </div>
          );
        })}
      </div>
    </UserLayout>
  );
};

export default Dashboard;
