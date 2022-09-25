import { EmptyState } from "components/empty/EmptyState";
import { UserLayout } from "components/layout/UserLayout";
import { BIKES_COLLECTION } from "constants/collection";
import { firestore } from "firebase-app/init";
import { deleteDoc, doc } from "firebase/firestore";
import { Button, Card, Dropdown, Rating } from "flowbite-react";
import { isEmpty, map, range } from "lodash";
import Link from "next/link";
import { useRouter } from "next/router";

import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";

import toast from "react-hot-toast";
import { useAppSelector } from "store/store";

const Bikes = () => {
  const allBikes = useAppSelector((state) => state.bikes.allBikes);

  const router = useRouter();

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

        <div className="pt-5">
          {map(allBikes, (bike) => {
            return (
              <div className="max-w-sm" key={bike.id}>
                <Card imgSrc="https://flowbite.com/docs/images/blog/image-1.jpg">
                  <div className="relative">
                    <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                      {bike.model}, {bike.color}
                    </h5>
                    <span className="font-normal text-gray-700 dark:text-gray-400">
                      {bike.location}
                      <Rating>
                        {map(range(1, bike.rating + 1), (star) => {
                          return (
                            <button key={star} type="button">
                              <Rating.Star />
                            </button>
                          );
                        })}
                      </Rating>
                    </span>

                    <div className="absolute top-1 right-1">
                      <Dropdown label="Manage" inline={true}>
                        <Dropdown.Item
                          onClick={() => {
                            router.push(`/admin/bikes/new?id=${bike.id}`);
                          }}
                        >
                          Edit Bike
                        </Dropdown.Item>
                        <Dropdown.Item>View Reservations</Dropdown.Item>
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
                  </div>
                </Card>
              </div>
            );
          })}
        </div>
      </div>
    </UserLayout>
  );
};

export default Bikes;
