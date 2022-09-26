import { Button, Modal, Rating, Spinner } from "flowbite-react";
import { map, range, size, some, values } from "lodash";
import { bikesActions } from "store/features/bikesSlice";
import { useAppDispatch, useAppSelector } from "store/store";

import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css";
import { useState } from "react";
import { addDoc, collection, doc, runTransaction, Timestamp } from "firebase/firestore";
import { firestore } from "firebase-app/init";
import { BIKES_COLLECTION, RESERVATIONS_COLLECTION } from "constants/collection";
import { useRouter } from "next/router";
import toast from "react-hot-toast";
import { calculateBikeRating } from "constants/ratings";
import { isWithinInterval } from "date-fns";

export const ReserveBikeModal = () => {
  const router = useRouter();

  const dispatch = useAppDispatch();
  const currentUser = useAppSelector((state) => state.currentUser.user);
  const { selectedBike, reservationDate } = useAppSelector((state) => state.bikes.reserveBike);

  const [isAdding, setIsAdding] = useState(false);

  const onClose = () => {
    dispatch(bikesActions.resetReserveBikeState());
  };

  const handleBikeReservation = async () => {
    try {
      setIsAdding(true);

      const bikeRef = doc(firestore, BIKES_COLLECTION, selectedBike?.id || "");
      const reservationRef = doc(collection(firestore, RESERVATIONS_COLLECTION));

      await runTransaction(firestore, async (transaction) => {
        //update the reservation dates on the
        transaction.update(bikeRef, {
          [`reservationDates.${reservationRef.id}`]: [reservationDate.startDate, reservationDate.endDate],
        });

        //add the reservation..
        transaction.set(reservationRef, {
          bikeId: selectedBike?.id,
          startDate: reservationDate.startDate,
          endDate: reservationDate.endDate,
          reservedBy: currentUser.id,
          reservedOn: Timestamp.now(),
        });
      });

      onClose();

      router.push("/users/reservations");
      toast.success("Awesome! You've have reserved Bike for the selected period");
    } catch (error) {
      console.log(error);
      toast.error("There was an error while reserving the Bike");
    } finally {
      setIsAdding(false);
    }
  };

  if (!selectedBike) {
    return null;
  }

  return (
    <Modal show={!!selectedBike} onClose={onClose} popup={true} size="5xl">
      <Modal.Header />

      <Modal.Body>
        <div className="space-y-6">
          <section>
            <div className="relative max-w-screen-xl px-4 mx-auto">
              <div className="grid items-start grid-cols-1 gap-8 md:grid-cols-2">
                <div className="grid grid-cols-1 gap-4">
                  <img
                    src={selectedBike.image || "/default.jpg"}
                    className="object-cover w-full aspect-square rounded-xl"
                  />
                </div>

                <div className="sticky top-0">
                  <div className="flex justify-between">
                    <div className="max-w-[35ch]">
                      <h1 className="text-2xl font-bold">{selectedBike.model}</h1>
                      <p className="mt-0.5 text-sm">{selectedBike.location}</p>

                      <div className="flex mt-2 -ml-0.5">
                        <Rating>
                          {map(range(0, calculateBikeRating(selectedBike.ratings)), () => {
                            return <Rating.Star />;
                          })}
                          <p className="ml-2 text-sm font-bold text-gray-900 dark:text-white">
                            {size(values(selectedBike.ratings))
                              ? calculateBikeRating(selectedBike.ratings)
                              : "No ratings yet"}
                          </p>
                        </Rating>
                      </div>
                    </div>
                    <fieldset>
                      <legend className="mb-1 text-sm font-medium">Color</legend>

                      <div className="flow-root">
                        <div className="flex flex-wrap -m-0.5">
                          <span className="flex px-3 py-1 space-x-1 text-xs font-medium border rounded-full group">
                            <span
                              className="block w-4 h-4 rounded-full"
                              style={{
                                backgroundColor: selectedBike.color,
                              }}
                            />
                            <span>{selectedBike.color}</span>
                          </span>
                        </div>
                      </div>
                    </fieldset>
                  </div>

                  <div className="mt-3">
                    <div className="flex mt-3">
                      <div>
                        <legend className="mb-1 text-sm font-medium">Select Dates you're reserving the Bike for</legend>

                        <DateRange
                          minDate={new Date()}
                          //disable days if it falls between any reservations for the bike... 
                          disabledDay={(date) =>
                            some(values(selectedBike.reservationDates), (reserved) =>
                              isWithinInterval(new Date(date), {
                                start: new Date(reserved[0].seconds * 1000),
                                end: new Date(reserved[1].seconds * 1000),
                              })
                            )
                          }
                          moveRangeOnFirstSelection={false}
                          editableDateInputs={true}
                          onChange={(item: any) => {
                            dispatch(
                              bikesActions.setReserveBikeState({
                                reservationDate: item.selection,
                              })
                            );
                          }}
                          ranges={[reservationDate]}
                        />
                      </div>
                    </div>

                    <Button
                      size="lg"
                      outline={true}
                      gradientDuoTone="purpleToBlue"
                      disabled={isAdding}
                      onClick={handleBikeReservation}
                    >
                      {isAdding && (
                        <div className="mr-3">
                          <Spinner size="sm" light={true} />
                        </div>
                      )}
                      Reserve
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </Modal.Body>
    </Modal>
  );
};
