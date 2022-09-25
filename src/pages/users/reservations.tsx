import { EmptyState } from "components/empty/EmptyState";
import { UserLayout } from "components/layout/UserLayout";
import { BIKES_COLLECTION, RESERVATIONS_COLLECTION } from "constants/collection";
import { formatDateInRelativeFormat } from "constants/date";
import { firestore } from "firebase-app/init";
import { deleteDoc, deleteField, doc, FieldValue, runTransaction, updateDoc } from "firebase/firestore";
import { Button, Modal, Rating, Spinner } from "flowbite-react";
import { find, isEmpty, map, range } from "lodash";
import { useState } from "react";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import { toast } from "react-hot-toast";

import { BikeReservationSelectorResponse, selectCurrentUserReservations } from "store/features/bikesSlice";
import { useAppSelector } from "store/store";

type BikeReservationProp = {
  reservation: BikeReservationSelectorResponse;
  rateReservation: () => void;
  cancelReservation: (reservationId: string) => void;
};
const Reservation = ({ reservation, rateReservation, cancelReservation }: BikeReservationProp) => {
  return (
    <div className="relative block border border-gray-100" key={reservation.id}>
      <img
        src={reservation.bike.image || "/default.jpg"}
        className="object-contain w-full"
      />

      <div className="absolute flex justify-between top-3 left-1 right-1">
        <p className="flex flex-col px-4 py-2 text-xs bg-gray-100 rounded-sm">
          <span>Reservation Date:</span>
          <span>{formatDateInRelativeFormat(reservation.startDate)} -</span>
          <span>{formatDateInRelativeFormat(reservation.endDate || reservation.startDate)} -</span>
        </p>

        <div className="flex flex-col space-y-1">
          {!reservation.rating && (
            <Button type="button" size="xs" color="light" onClick={rateReservation}>
              Rate Bike
            </Button>
          )}

          <Button
            type="button"
            size="xs"
            color="failure"
            onClick={() => {
              confirmAlert({
                title: "Cancel Reservation",
                message: "Are you sure you want to cancel your Reservation? You can't undo this action.",
                buttons: [
                  {
                    label: "Yes, Proceed",
                    onClick: () => {
                      cancelReservation(reservation.id);
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
            Cancel Reservation
          </Button>
        </div>
      </div>

      <div className="px-6 py-2 space-y-1">
        <h5 className="text-lg font-bold">
          {reservation.bike.location}, {reservation.bike.model}
        </h5>
        <span className="text-sm"></span>

        <p className="text-xs text-gray-700">created on: {formatDateInRelativeFormat(reservation.reservedOn)}</p>
      </div>
    </div>
  );
};

const Reservations = () => {
  const [rateReservationId, setRateReservationId] = useState("");
  const [bikeRating, setBikeRating] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);

  const reservations = useAppSelector(selectCurrentUserReservations);

  const cancelReservation = async (reservationId: string) => {
    try {
      await deleteDoc(doc(firestore, RESERVATIONS_COLLECTION, reservationId));

      const reservationRef = doc(firestore, RESERVATIONS_COLLECTION, reservationId);
      const bikeRef = doc(firestore, BIKES_COLLECTION, find(reservations, (r) => r.id === reservationId)?.bikeId || "");

      await runTransaction(firestore, async (transaction) => {
        //delete the reservation...
        transaction.delete(reservationRef);

        //remove the ratings from the Bike collection
        transaction.update(bikeRef, {
          [`ratings.${reservationId}`]: deleteField(),
          [`reservationDates.${reservationId}`]: deleteField(),
        });
      });

      toast.success("You've cancelled your reservation");
    } catch (error) {
      console.log(error);
      toast.error("There was an error cancelling your reservation");
    }
  };

  const handleRateReservation = async () => {
    try {
      setIsProcessing(true);

      const reservationRef = doc(firestore, RESERVATIONS_COLLECTION, rateReservationId);
      const bikeRef = doc(
        firestore,
        BIKES_COLLECTION,
        find(reservations, (r) => r.id === rateReservationId)?.bikeId || ""
      );

      await runTransaction(firestore, async (transaction) => {
        transaction.update(reservationRef, { rating: bikeRating });

        //update the ratings on the Bike collection
        transaction.update(bikeRef, {
          [`ratings.${rateReservationId}`]: bikeRating,
        });
      });

      await updateDoc(reservationRef, {
        rating: bikeRating,
      });
      setRateReservationId("");
      toast.success("Thanks for the rating!");
    } catch (error) {
      console.log(error);
      toast.error("Error saving your Rating");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <>
      <UserLayout>
        <div className="p-10">
          <h3 className="font-sans text-2xl font-medium">My Reservations</h3>

          {isEmpty(reservations) && (
            <EmptyState
              title="There's nothing here"
              message="Bikes you've reserved would appear here, try reserving one"
              linkText="Reserve a bike"
              link="/users/"
            />
          )}

          <div className="grid grid-cols-3 mt-8 gap-x-4 gap-y-8">
            {map(reservations, (reservation) => {
              return (
                <Reservation
                  reservation={reservation}
                  cancelReservation={cancelReservation}
                  rateReservation={() => {
                    setRateReservationId(reservation.id);
                  }}
                />
              );
            })}
          </div>
        </div>
      </UserLayout>

      <Modal
        show={!!rateReservationId}
        onClose={() => {
          setRateReservationId("");
        }}
        popup={true}
        size="sm"
      >
        <Modal.Header />
        <Modal.Body>
          <div className="flex">
            <div className="flex flex-col mx-auto space-y-2 text-center w-fit">
              <h1 className="text-3xl">How was the bike?</h1>
              <div className="flex">
                <div className="mx-auto w-fit">
                  <Rating size={"lg"}>
                    {map(range(1, 6), (star) => {
                      return (
                        <button
                          key={star}
                          type="button"
                          onClick={() => {
                            setBikeRating(star);
                          }}
                        >
                          <Rating.Star filled={star <= bikeRating} />
                        </button>
                      );
                    })}
                  </Rating>
                </div>
              </div>

              <div className="mx-auto">
                <Button size="sm" color="success" onClick={handleRateReservation} disabled={isProcessing}>
                  <span className="flex flex-row px-20">
                    {isProcessing && (
                      <div className="mr-3">
                        <Spinner size="sm" light={true} />
                      </div>
                    )}
                    Done
                  </span>
                </Button>
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default Reservations;
