import { EmptyState } from "components/empty/EmptyState";
import { UserLayout } from "components/layout/UserLayout";
import { formatDateInRelativeFormat } from "constants/date";
import { Breadcrumb, Table } from "flowbite-react";
import { isEmpty, map } from "lodash";
import { useRouter } from "next/router";
import { selectBikeReservations, selectUserReservations } from "store/features/bikesSlice";
import { selectUser } from "store/features/usersSlice";
import { useAppSelector } from "store/store";

const UserReservations = () => {
  const router = useRouter();
  const { id } = router.query;

  const bikesReservations = useAppSelector((state) => selectUserReservations(state, (id as string) || ""));
  const user = useAppSelector((state) => selectUser(state, (id as string) || ""));

  return (
    <UserLayout>
      <Breadcrumb className="px-5 py-3 bg-gray-50 dark:bg-gray-900">
        <Breadcrumb.Item href="/admin/">Dashboard</Breadcrumb.Item>
        <Breadcrumb.Item href="/admin/users">All Users</Breadcrumb.Item>
      </Breadcrumb>

      <div className="p-10">
        <div className="flex justify-between mb-5">
          <h3 className="font-sans text-2xl font-medium">{user?.fullName || ""}'s Reservations</h3>
        </div>

        {isEmpty(bikesReservations) && (
          <EmptyState
            title="No Reservations for this User"
            message="This user hasn't made any reservations yet. You can check back later"
          />
        )}
        {!isEmpty(bikesReservations) && (
          <Table>
            <Table.Head>
              <Table.HeadCell>Bike Reserved</Table.HeadCell>
              <Table.HeadCell>Date of Reservation</Table.HeadCell>
              <Table.HeadCell>Created on</Table.HeadCell>
            </Table.Head>
            <Table.Body className="divide-y">
              {map(bikesReservations, (reservation) => {
                return (
                  <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800" key={reservation.id}>
                    <Table.Cell className="font-medium text-gray-900 whitespace-nowrap dark:text-white">
                      {reservation.bike.model} {reservation.bike.location} <small>{reservation.bike.color}</small>
                      <small> {reservation.rating ? `(rated ${reservation.rating} stars)` : "-"}</small>
                    </Table.Cell>
                    <Table.Cell>
                      {formatDateInRelativeFormat(reservation.startDate)} -{" "}
                      {formatDateInRelativeFormat(reservation.endDate)}
                    </Table.Cell>
                    <Table.Cell>{formatDateInRelativeFormat(reservation.reservedOn)}</Table.Cell>
                  </Table.Row>
                );
              })}
            </Table.Body>
          </Table>
        )}
      </div>
    </UserLayout>
  );
};

export default UserReservations;
