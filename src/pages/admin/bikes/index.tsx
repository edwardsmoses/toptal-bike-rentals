import { EmptyState } from "components/empty/EmptyState";
import { UserLayout } from "components/layout/UserLayout";
import { Card, Rating } from "flowbite-react";
import { isEmpty, map, range } from "lodash";
import { useAppSelector } from "store/store";

const Bikes = () => {
  const allBikes = useAppSelector((state) => state.bikes.allBikes);

  return (
    <UserLayout>
      <div className="p-10">
        <h3 className="text-2xl font-medium font-sans">My Bikes</h3>

        {isEmpty(allBikes) && (
          <EmptyState
            title="There's nothing here"
            message="Bikes you've created would appear here, try adding one"
            linkText="Add a bike"
            link="/admin/bikes/new"
          />
        )}

        <div className="pt-5">
          {map(allBikes, (bike) => {
            return (
              <div className="max-w-sm" key={bike.id}>
                <Card imgSrc="https://flowbite.com/docs/images/blog/image-1.jpg">
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
