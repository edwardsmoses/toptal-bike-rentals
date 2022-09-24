import { Button, Modal, Rating } from "flowbite-react";
import { map, range } from "lodash";
import { bikesActions } from "store/features/bikesSlice";
import { useAppDispatch, useAppSelector } from "store/store";

export const ReserveBikeModal = () => {
  const dispatch = useAppDispatch();
  const { selectedBike } = useAppSelector((state) => state.bikes.reserveBike);

  const onClose = () => {
    dispatch(bikesActions.resetReserveBikeState());
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
            <div className="relative max-w-screen-xl px-4 py-8 mx-auto">
              <div className="grid items-start grid-cols-1 gap-8 md:grid-cols-2">
                <div className="grid grid-cols-1 gap-4">
                  <img
                    alt="Les Paul"
                    src="https://images.unsplash.com/photo-1456948927036-ad533e53865c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
                    className="object-cover w-full aspect-square rounded-xl"
                  />
                </div>

                <div className="sticky top-0">
                  <div className="flex justify-between mt-8">
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
                  </div>

                  <details className="relative mt-4 group">
                    <summary className="block">
                      <div>
                        <div className="prose max-w-none group-open:hidden">
                          <p>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa veniam dicta beatae eos ex
                            error culpa delectus rem tenetur, architecto quam nesciunt, dolor veritatis nisi minus
                            inventore, rerum at recusandae?
                          </p>
                        </div>

                        <span className="mt-4 text-sm font-medium underline cursor-pointer group-open:absolute group-open:bottom-0 group-open:left-0 group-open:mt-0">
                          Read More
                        </span>
                      </div>
                    </summary>

                    <div className="pb-6 prose max-w-none">
                      <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa veniam dicta beatae eos ex error
                        culpa delectus rem tenetur, architecto quam nesciunt, dolor veritatis nisi minus inventore,
                        rerum at recusandae?
                      </p>

                      <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat nam sapiente nobis ea veritatis
                        error consequatur nisi exercitationem iure laudantium culpa, animi temporibus non! Maxime et
                        quisquam amet. A, deserunt!
                      </p>
                    </div>
                  </details>

                  <div className="mt-8">
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

                    <div className="flex mt-8">
                      <div>
                        <legend className="mb-1 text-sm font-medium">Select Reservation Date</legend>
                        <input
                          type="date"
                          id="quantity"
                          min="1"
                          value="1"
                          className="w-12 py-3 text-xs text-center border-gray-200 rounded [-moz-appearance:_textfield] [&::-webkit-outer-spin-button]:m-0 [&::-webkit-inner-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                        />
                      </div>
                    </div>

                    <Button size="lg" outline={true} gradientDuoTone="purpleToBlue">
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
