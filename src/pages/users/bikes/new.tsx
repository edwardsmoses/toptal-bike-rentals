import { UserLayout } from "components/layout/UserLayout";

import { Label, TextInput, Checkbox, Button, Spinner, Rating } from "flowbite-react";
import Link from "next/link";
import { useRouter } from "next/router";
import { FormEvent, useState } from "react";
import { map, range } from "lodash";
import { addDoc, collection } from "firebase/firestore";
import { auth, firestore } from "firebase-app/init";
import { BIKES_COLLECTION } from "constants/collection";
import { toast } from "react-hot-toast";

const NewBike = () => {
  const router = useRouter();

  const [model, setModel] = useState("");
  const [color, setColor] = useState("");
  const [location, setLocation] = useState("");
  const [rating, setRating] = useState(0);
  const [isAvailableForRental, setIsAvailableForRental] = useState(false);
  const [isAdding, setIsAdding] = useState(false);

  const handleAddNewBike = async (event: FormEvent) => {
    event.preventDefault();

    try {
      setIsAdding(true);
      await addDoc(collection(firestore, BIKES_COLLECTION), {
        model,
        color,
        location,
        rating,
        isAvailableForRental,
        addedBy: auth.currentUser?.uid || "",
      });
      router.push("/users/bikes");
      toast.success("Awesome! Your bike has been added successfully.");
    } catch (error) {
      toast.error("There was an error while adding your bike");
    } finally {
      setIsAdding(false);
    }
  };

  return (
    <UserLayout>
      <div className="p-10">
        <h3 className="text-2xl font-medium font-sans">Add a new Bike</h3>

        <form action="#" className="grid grid-cols-6 gap-6 mt-8" onSubmit={handleAddNewBike}>
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

          <div className="col-span-6">
            <Label htmlFor="rating" value="Rating" />
            <Rating>
              {map(range(1, 6), (star) => {
                return (
                  <button
                    key={star}
                    type="button"
                    onClick={() => {
                      setRating(star);
                    }}
                  >
                    <Rating.Star filled={star <= rating} />
                  </button>
                );
              })}
            </Rating>
          </div>

          <div className="col-span-6 space-x-2">
            <Checkbox
              id="available"
              checked={isAvailableForRental}
              onChange={(event) => {
                setIsAvailableForRental(event.currentTarget.checked);
              }}
            />
            <Label htmlFor="available">Is this bike available for rental?</Label>
          </div>

          <div className="col-span-6 space-y-2">
            <Button type="submit" disabled={isAdding}>
              {isAdding && (
                <div className="mr-3">
                  <Spinner size="sm" light={true} />
                </div>
              )}
              Add Bike
            </Button>
          </div>
        </form>
      </div>
    </UserLayout>
  );
};

export default NewBike;
