import { UserLayout } from "components/layout/UserLayout";

import { Label, TextInput, Button, Spinner, ToggleSwitch } from "flowbite-react";
import { useRouter } from "next/router";
import { FormEvent, useEffect, useState } from "react";
import { find } from "lodash";
import { addDoc, collection, doc, Timestamp, updateDoc } from "firebase/firestore";
import { firestore } from "firebase-app/init";
import { BIKES_COLLECTION } from "constants/collection";
import { toast } from "react-hot-toast";
import { useAppSelector } from "store/store";

const NewBike = () => {
  const router = useRouter();
  const { id } = router.query;

  const bikes = useAppSelector((state) => state.bikes.allBikes);
  const currentUser = useAppSelector((state) => state.currentUser.user);

  const [editBikeId, setEditBikeId] = useState("");
  const [model, setModel] = useState("");
  const [color, setColor] = useState("");
  const [location, setLocation] = useState("");

  const [isAvailableForRental, setIsAvailableForRental] = useState(false);
  const [isAdding, setIsAdding] = useState(false);

  useEffect(() => {
    const currentBike = find(bikes, (bike) => bike.id === id);
    if (currentBike) {
      setEditBikeId(currentBike.id);
      setModel(currentBike.model);
      setColor(currentBike.color);
      setLocation(currentBike.location);
      setIsAvailableForRental(currentBike.isAvailableForRental);
    }
  }, [id]);

  const handleSaveBike = async (event: FormEvent) => {
    event.preventDefault();

    try {
      setIsAdding(true);

      const bikeInfo = {
        model,
        color,
        location,
        isAvailableForRental,
      };

      if (editBikeId) {
        const bikeRef = doc(firestore, BIKES_COLLECTION, editBikeId);
        await updateDoc(bikeRef, {
          ...bikeInfo,
          updatedOn: Timestamp.now(),
          updatedBy: currentUser.id,
        });
      } else {
        await addDoc(collection(firestore, BIKES_COLLECTION), {
          ...bikeInfo,
          addedOn: Timestamp.now(),
          addedBy: currentUser.id,
        });
      }

      router.push("/admin/bikes");
      toast.success(`Awesome! Your bike has been ${editBikeId ? "updated" : "added"} successfully.`);
    } catch (error) {
      toast.error(`There was an error while ${editBikeId ? "updating" : "adding"} your bike`);
    } finally {
      setIsAdding(false);
    }
  };

  return (
    <UserLayout>
      <div className="p-10">
        <h3 className="font-sans text-2xl font-medium">{editBikeId ? "Edit" : "Add a new"} Bike</h3>

        <form action="#" className="grid grid-cols-6 gap-6 mt-8" onSubmit={handleSaveBike}>
          <div className="col-span-6">
            <Label htmlFor="model" value="Model" />
            <TextInput
              id="model"
              value={model}
              onChange={(event) => {
                setModel(event.currentTarget.value);
              }}
              required={true}
            />
          </div>

          <div className="col-span-6">
            <Label htmlFor="color" value="Color" />
            <TextInput
              id="color"
              value={color}
              onChange={(event) => {
                setColor(event.currentTarget.value);
              }}
              placeholder=""
              required={true}
            />
          </div>

          <div className="col-span-6">
            <Label htmlFor="location" value="Location" />
            <TextInput
              id="location"
              value={location}
              onChange={(event) => {
                setLocation(event.currentTarget.value);
              }}
              placeholder=""
              required={true}
            />
          </div>

          <div className="col-span-6 space-x-2">
            <ToggleSwitch
              checked={isAvailableForRental}
              label="Is this bike available for rental?"
              onChange={setIsAvailableForRental}
            />
          </div>

          <div className="col-span-6 space-y-2">
            <Button type="submit" disabled={isAdding}>
              {isAdding && (
                <div className="mr-3">
                  <Spinner size="sm" light={true} />
                </div>
              )}
              {editBikeId ? "Update" : "Add"} Bike
            </Button>
          </div>
        </form>
      </div>
    </UserLayout>
  );
};

export default NewBike;
