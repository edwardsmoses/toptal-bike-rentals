import { UserLayout } from "components/layout/UserLayout";
import { formatDateInRelativeFormat } from "constants/date";
import { format, formatRelative } from "date-fns";
import { Button } from "flowbite-react";
import { map } from "lodash";
import { selectCurrentUserReservations } from "store/features/bikesSlice";
import { useAppSelector } from "store/store";

const Reservations = () => {
  const reservations = useAppSelector(selectCurrentUserReservations);

  return (
    <UserLayout>
      <div className="p-10">
        <h3 className="font-sans text-2xl font-medium">My Reservations</h3>

        <div className="grid grid-cols-3 mt-8 gap-x-4 gap-y-8">
          {map(reservations, (reservation) => {
            return (
              <div className="relative block border border-gray-100" key={reservation.id}>
                <img
                  src="https://images.unsplash.com/photo-1456948927036-ad533e53865c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
                  className="object-contain w-full"
                />

                <div className="absolute top-3 right-1">
                  <Button type="button" size="xs">
                    Cancel Reservation
                  </Button>
                </div>

                <div className="px-6 py-2 space-y-1">
                  <h5 className="text-lg font-bold">
                    {reservation.bike.location}, {reservation.bike.model}
                  </h5>
                  <span className="text-sm">
                    Reservation date: 
                    <span className="text-xs font-medium">
                      {formatDateInRelativeFormat(reservation.startDate)} -{" "}
                      {formatDateInRelativeFormat(reservation.endDate || reservation.startDate)}
                    </span>
                  </span>

                  <p className="text-xs text-gray-700">
                    reserved on: {formatDateInRelativeFormat(reservation.reservedOn)}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </UserLayout>
  );
};

export default Reservations;
