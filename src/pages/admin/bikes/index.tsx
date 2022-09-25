import { EmptyState } from "components/empty/EmptyState";
import { UserLayout } from "components/layout/UserLayout";
import { BIKES_COLLECTION } from "constants/collection";
import { formatDateInRelativeFormat } from "constants/date";
import { calculateBikeRating } from "constants/ratings";
import { firestore } from "firebase-app/init";
import { deleteDoc, doc } from "firebase/firestore";
import { Button, Card, Dropdown, Rating } from "flowbite-react";
import { isEmpty, map, size } from "lodash";
import { Bike } from "models/model";
import Link from "next/link";
import { useRouter } from "next/router";

import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";

import toast from "react-hot-toast";
import { selectBikeReservations } from "store/features/bikesSlice";
import { selectUser } from "store/features/usersSlice";
import { useAppSelector } from "store/store";

type BikeCardProp = {
  bike: Bike;
};

const BikeCard = ({ bike }: BikeCardProp) => {
  const router = useRouter();
  const reservations = useAppSelector((state) => selectBikeReservations(state, bike.id));

  const userWhoAddedBike = useAppSelector((state) => selectUser(state, bike.addedBy || ""));
  const userWhoUpdatedBike = useAppSelector((state) => selectUser(state, bike.updatedBy || ""));

  return (
    <div className="relative flex items-stretch" key={bike.id}>
      <div className="relative flex flex-col items-stretch w-full bg-white border border-gray-200 rounded-lg shadow-md dark:border-gray-700 dark:bg-gray-800">
        <img className="object-cover w-full mb-3 shadow-lg h-44" src={bike.image || "/default.jpg"} />

        <div className="absolute flex flex-col items-end space-y-2 top-3 right-5 left">
          {bike.isAvailableForRental && (
            <span className="ml-3 inline-flex items-center justify-center rounded bg-gray-200 px-2 py-0.5 text-xs font-medium text-gray-500 dark:bg-gray-700 dark:text-gray-400">
              Is Available For Rent
            </span>
          )}

          <Dropdown label="Actions" size="xs">
            <Dropdown.Item
              onClick={() => {
                router.push(`/admin/bikes/new?id=${bike.id}`);
              }}
            >
              Edit Bike
            </Dropdown.Item>
            <Dropdown.Item
              onClick={() => {
                router.push(`/admin/bikes/reservations?id=${bike.id}`);
              }}
            >
              View Reservations
            </Dropdown.Item>
            <Dropdown.Item
              onClick={() => {
                confirmAlert({
                  title: "Delete Bike",
                  message:
                    "Are you sure you want to delete this Bike? All reservations would be lost! You can't undo this action.",
                  buttons: [
                    {
                      label: "Yes, Proceed",
                      onClick: async () => {
                        await deleteDoc(doc(firestore, BIKES_COLLECTION, bike.id));
                        toast.success("You've deleted this Bike");
                      },
                    },
                    {
                      label: "No",
                      onClick: () => {},
                    },
                  ],
                });
              }}
            >
              Delete Bike
            </Dropdown.Item>
          </Dropdown>
        </div>

        <div className="px-3 pt-2 pb-3">
          <h5 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
            {bike.model}, {bike.color}
          </h5>
          <span className="font-normal text-gray-700 dark:text-gray-400">
            {bike.location}{" "}
            <div className="flex justify-between">
              <Rating>
                <Rating.Star />
                <p className="ml-2 text-sm font-bold text-gray-900 dark:text-white">
                  {calculateBikeRating(bike.ratings)}
                </p>
                <span className="mx-1.5 h-1 w-1 rounded-full bg-gray-500 dark:bg-gray-400" />
                <Link href={`/admin/bikes/reservations?id=${bike.id}`}>
                  <a className="text-sm font-medium text-gray-900 underline hover:no-underline dark:text-white">
                    {size(reservations)} reservations
                  </a>
                </Link>
              </Rating>
              <small>
                <small className="flex flex-col w-28 text-[8px]">
                  <span>
                    created {formatDateInRelativeFormat(bike.addedOn, false)}{" "}
                    {userWhoAddedBike ? `by ${userWhoAddedBike.fullName}` : ""}{" "}
                  </span>
                  {!!bike.updatedOn && (
                    <>
                      <hr />
                      <span>
                        updated {formatDateInRelativeFormat(bike.updatedOn, false)}{" "}
                        {userWhoUpdatedBike ? `by ${userWhoUpdatedBike.fullName}` : ""}{" "}
                      </span>
                    </>
                  )}
                </small>
              </small>
            </div>
          </span>
        </div>
      </div>
    </div>
  );
};

const Bikes = () => {
  const allBikes = useAppSelector((state) => state.bikes.allBikes);

  return (
    <UserLayout>
      <div className="p-10">
        <div className="flex justify-between mb-2">
          <h3 className="font-sans text-2xl font-medium">All Bikes</h3>
          <Link href="/admin/bikes/new">
            <Button>New Bike</Button>
          </Link>
        </div>

        {isEmpty(allBikes) && (
          <EmptyState
            title="There's nothing here"
            message="Bikes created would appear here, try adding one"
            linkText="Add a bike"
            link="/admin/bikes/new"
          />
        )}

        <div className="grid grid-cols-3 py-5 mt-8 gap-x-3 gap-y-8">
          {map(allBikes, (bike) => {
            return <BikeCard key={bike.id} bike={bike} />;
          })}
        </div>
      </div>
    </UserLayout>
  );
};

export default Bikes;
