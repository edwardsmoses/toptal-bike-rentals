import { Button, Modal, Rating, Spinner } from "flowbite-react";
import { map, range } from "lodash";
import { bikesActions } from "store/features/bikesSlice";
import { useAppDispatch, useAppSelector } from "store/store";

import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css";
import { useState } from "react";
import { addDoc, collection, Timestamp } from "firebase/firestore";
import { firestore } from "firebase-app/init";
import { RESERVATIONS_COLLECTION } from "constants/collection";
import { useRouter } from "next/router";
import toast from "react-hot-toast";

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
      console.log({
        bikeId: selectedBike?.id,
        startDate: reservationDate.startDate,
        endDate: reservationDate.endDate,
        reservedBy: currentUser.id,
        reservedOn: Timestamp.now(),
      });
      await addDoc(collection(firestore, RESERVATIONS_COLLECTION), {
        bikeId: selectedBike?.id,
        startDate: reservationDate.startDate,
        endDate: reservationDate.endDate,
        reservedBy: currentUser.id,
        reservedOn: Timestamp.now(),
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
                    alt="Les Paul"
                    src="https://images.unsplash.com/photo-1456948927036-ad533e53865c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
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
                          {map(range(1, selectedBike.rating + 1), (star) => {
                            return <Rating.Star />;
                          })}
                        </Rating>
                      </div>
                    </div>
                    <fieldset>
                      <legend className="mb-1 text-sm font-medium">Color</legend>

                      <div className="flow-root">
                        <div className="flex flex-wrap -m-0.5">
                          <span className="inline-block px-3 py-1 text-xs font-medium border rounded-full group">
                            {selectedBike.color}
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
