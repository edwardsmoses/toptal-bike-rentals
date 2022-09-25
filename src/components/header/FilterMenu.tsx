import { Dropdown, Rating, Select } from "flowbite-react";
import { capitalize, filter, includes, map, range } from "lodash";
import { DateRange } from "react-date-range";
import { bikesActions, selectFilterBikeOptions } from "store/features/bikesSlice";
import { useAppDispatch, useAppSelector } from "store/store";

export const FilterMenu = () => {
  const dispatch = useAppDispatch();

  const { color, model, location, rating, endDate, startDate } = useAppSelector((state) => state.bikes.filterBikes);
  const selectOptions = useAppSelector(selectFilterBikeOptions);

  return (
    <Dropdown label="Filter Bikes" inline={true}>
      <div className="border-t border-gray-200 lg:border-t-0 min-w-[400px] max-h-[500px] overflow-y-scroll z-30">
        <fieldset>
          <legend className="block w-full px-5 py-3 text-xs font-medium bg-gray-50">Model</legend>
        </fieldset>
        <div className="p-3">
          <Select
            id="model"
            value={model}
            onChange={(event) => {
              dispatch(bikesActions.setFilterBikeState({ model: event.currentTarget.value }));
            }}
          >
            <option value="" disabled>
              Please select
            </option>
            {map(selectOptions.model, (m) => {
              return <option value={m}>{capitalize(m)}</option>;
            })}
          </Select>
          <div className="pt-2">
            <button
              type="button"
              onClick={() => {
                dispatch(bikesActions.setFilterBikeState({ model: "" }));
              }}
              className="text-xs text-gray-500 underline"
            >
              Reset Model
            </button>
          </div>
        </div>

        <fieldset>
          <legend className="block w-full px-5 py-3 text-xs font-medium bg-gray-50">Color</legend>
        </fieldset>
        <div className="p-3">
          <Select
            id="color"
            value={color}
            onChange={(event) => {
              dispatch(bikesActions.setFilterBikeState({ color: event.currentTarget.value }));
            }}
          >
            <option value="" disabled>
              Please select
            </option>
            {map(selectOptions.color, (m) => {
              return <option value={m}>{capitalize(m)}</option>;
            })}
          </Select>
          <div className="pt-2">
            <button
              type="button"
              onClick={() => {
                dispatch(bikesActions.setFilterBikeState({ color: "" }));
              }}
              className="text-xs text-gray-500 underline"
            >
              Reset Color
            </button>
          </div>
        </div>

        <fieldset>
          <legend className="block w-full px-5 py-3 text-xs font-medium bg-gray-50">Location</legend>
        </fieldset>
        <div className="p-3">
          <Select
            id="location"
            value={location}
            onChange={(event) => {
              dispatch(bikesActions.setFilterBikeState({ location: event.currentTarget.value }));
            }}
          >
            <option value="" disabled>
              Please select
            </option>
            {map(selectOptions.location, (m) => {
              return <option value={m}>{capitalize(m)}</option>;
            })}
          </Select>
          <div className="pt-2">
            <button
              type="button"
              onClick={() => {
                dispatch(bikesActions.setFilterBikeState({ location: "" }));
              }}
              className="text-xs text-gray-500 underline"
            >
              Reset Location
            </button>
          </div>
        </div>

        <div>
          <fieldset>
            <legend className="block w-full px-5 py-3 text-xs font-medium bg-gray-50">Rating</legend>

            <div className="px-5 py-6 space-y-2">
              {map(range(1, 6), (star) => {
                return (
                  <div className="flex items-center" key={star}>
                    <input
                      id={`${star}`}
                      type="checkbox"
                      checked={includes(rating, star)}
                      onChange={(event) => {
                        if (event.currentTarget.checked) {
                          //add to rating filter..
                          dispatch(
                            bikesActions.setFilterBikeState({
                              rating: [...(rating || []), star],
                            })
                          );
                        } else {
                          //remove from rating filter...
                          dispatch(
                            bikesActions.setFilterBikeState({
                              rating: filter(rating, (r) => r !== star),
                            })
                          );
                        }
                      }}
                      name="rating"
                      className="w-5 h-5 border-gray-300 rounded"
                    />

                    <label htmlFor={`${star}`} className="flex flex-row ml-2 text-sm font-medium">
                      <Rating>
                        {map(range(0, star), (starred) => {
                          return <Rating.Star key={starred} />;
                        })}
                      </Rating>
                    </label>
                  </div>
                );
              })}

              <div className="pt-2">
                <button
                  type="button"
                  className="text-xs text-gray-500 underline"
                  onClick={() => {
                    dispatch(bikesActions.setFilterBikeState({ rating: [] }));
                  }}
                >
                  Reset Rating
                </button>
              </div>
            </div>
          </fieldset>
        </div>

        <fieldset>
          <legend className="block w-full px-5 py-3 text-xs font-medium bg-gray-50">Available Dates</legend>
        </fieldset>
        <div className="p-3">
          <DateRange
            minDate={new Date()}
            moveRangeOnFirstSelection={false}
            editableDateInputs={true}
            onChange={(item: any) => {
              dispatch(
                bikesActions.setFilterBikeState({
                  endDate: item.selection.endDate,
                  startDate: item.selection.startDate,
                })
              );
            }}
            ranges={[
              {
                startDate: new Date(startDate || new Date()),
                endDate: new Date(endDate || new Date()),
                key: "selection",
              },
            ]}
          />
          <div className="pt-2">
            <button
              type="button"
              onClick={() => {
                dispatch(bikesActions.setFilterBikeState({ startDate: "", endDate: "" }));
              }}
              className="text-xs text-gray-500 underline"
            >
              Reset Dates
            </button>
          </div>
        </div>

        <div className="flex justify-between px-5 py-3 border-t border-gray-200">
          <button
            name="reset"
            type="button"
            onClick={() => {
              dispatch(bikesActions.resetFilterBikeState());
            }}
            className="text-xs font-medium text-gray-600 underline rounded"
          >
            Reset All
          </button>
        </div>
      </div>
    </Dropdown>
  );
};
