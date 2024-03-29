import { NotAvailableModal } from "components/bikes/NotAvailableModal";
import { ReserveBikeModal } from "components/bikes/ReserveModal";
import { EmptyState } from "components/empty/EmptyState";
import { UserLayout } from "components/layout/UserLayout";
import { calculateBikeRating } from "constants/ratings";
import { sortEntitiesByDate } from "constants/sortByDate";
import { isEmpty, map } from "lodash";
import { bikesActions, selectBikesForRental } from "store/features/bikesSlice";
import { useAppDispatch, useAppSelector } from "store/store";

const Dashboard = () => {
  const dispatch = useAppDispatch();
  const allBikes = useAppSelector(selectBikesForRental);

  return (
    <>
      <UserLayout>
        <div className="p-10">
          <h3 className="font-sans text-2xl font-medium">All Bikes</h3>

          {isEmpty(allBikes) && (
            <div className="flex w-full">
              <div className="m-auto">
                <EmptyState
                  title="No Bikes found"
                  message="There are no available bikes found with the current filter set."
                />
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 mt-8 lg:grid-cols-4 gap-x-4 gap-y-8">
            {map(sortEntitiesByDate(allBikes), (bike) => {
              return (
                <div
                  className="flex items-stretch cursor-pointer"
                  key={bike.id}
                  onClick={() => {
                    dispatch(
                      bikesActions.setReserveBikeState({
                        selectedBike: bike,
                      })
                    );
                  }}
                >
                  <a
                    className="relative block w-full overflow-hidden bg-center bg-no-repeat bg-cover rounded-xl"
                    style={{
                      backgroundImage: `url(${bike.image || "/default.jpg"})`,
                    }}
                  >
                    <div className="relative p-8 pt-40 text-white bg-black bg-opacity-40">
                      <strong
                        className={`absolute top-4 left-0 py-1.5 px-3 text-xs uppercase tracking-wider text-white ${
                          bike.isAvailableForRental ? "bg-green-600" : "bg-red-600"
                        }`}
                      >
                        {bike.isAvailableForRental ? "Available" : "Not available"}
                      </strong>

                      <span className="absolute z-[1] inline-flex items-center px-3 py-1 text-xs font-semibold text-white bg-black rounded-full right-4 top-4">
                        {calculateBikeRating(bike.ratings)}

                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4 ml-1.5 text-yellow-300"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      </span>

                      <h5 className="text-2xl font-bold">
                        {bike.model}, {bike.color}
                      </h5>
                      <p className="text-sm">{bike.location}</p>
                    </div>
                  </a>
                </div>
              );
            })}
          </div>
        </div>
      </UserLayout>
      <NotAvailableModal />
      <ReserveBikeModal />
    </>
  );
};

export default Dashboard;
