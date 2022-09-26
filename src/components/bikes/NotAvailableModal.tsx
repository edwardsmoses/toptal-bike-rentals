import { Button, Modal } from "flowbite-react";
import { bikesActions } from "store/features/bikesSlice";
import { useAppDispatch, useAppSelector } from "store/store";

export const NotAvailableModal = () => {
  const { selectedBike } = useAppSelector((state) => state.bikes.reserveBike);
  const dispatch = useAppDispatch();

  const onClose = () => {
    dispatch(bikesActions.resetReserveBikeState());
  };

  if (!selectedBike) {
    return null;
  }

  return (
    <Modal show={!!(selectedBike && !selectedBike.isAvailableForRental)} onClose={onClose} popup={true} size="sm">
      <Modal.Header />
      <Modal.Body>
        <div className="flex">
          <div className="flex flex-col mx-auto space-y-2 text-center w-fit">
            <h1 className="text-xl">
              {selectedBike.model}, {selectedBike.color} <br />{" "}
              <small> Bike isn't available for Rental. Please check back later</small>
            </h1>

            <div className="mx-auto">
              <Button size="sm" onClick={onClose}>
                <span className="flex flex-row px-20">Close</span>
              </Button>
            </div>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};
