import { UserLayout } from "components/layout/UserLayout";
import { USERS_COLLECTION } from "constants/collection";
import { firestore } from "firebase-app/init";
import { deleteDoc, doc } from "firebase/firestore";
import { Button, Dropdown, Table } from "flowbite-react";
import { capitalize, first, map, size, words } from "lodash";
import { User } from "models/model";
import Link from "next/link";
import { useRouter } from "next/router";

import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";

import toast from "react-hot-toast";
import { selectUserReservations } from "store/features/bikesSlice";
import { useAppSelector } from "store/store";

type UserRowProps = {
  user: User;
};

const UserRow = ({ user }: UserRowProps) => {
  const currentUser = useAppSelector((state) => state.currentUser.user);
  const reservations = useAppSelector((state) => selectUserReservations(state, user.id));
  const router = useRouter();

  return (
    <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800" key={user.id}>
      <Table.Cell className="font-medium text-gray-900 whitespace-nowrap dark:text-white">{user.fullName}</Table.Cell>
      <Table.Cell>{user.email}</Table.Cell>
      <Table.Cell>{capitalize(user.role)}</Table.Cell>
      <Table.Cell>
        {user.role === "user" ? (
          <Link href={`/admin/users/reservations?id=${user.id}`}>
            <a className="text-sm font-medium text-gray-900 underline hover:no-underline dark:text-white">
              {size(reservations)} reservations
            </a>
          </Link>
        ) : (
          "-"
        )}
      </Table.Cell>
      <Table.Cell>
        <Dropdown label="Actions" size="sm">
          <Dropdown.Item
            onClick={() => {
              router.push(`/admin/users/reservations?id=${user.id}`);
            }}
          >
            View Reservations
          </Dropdown.Item>
          <Dropdown.Item
            onClick={() => {
              router.push(`/admin/users/new?id=${user.id}`);
            }}
          >
            Edit
          </Dropdown.Item>
          {user.id !== currentUser.id && (
            <Dropdown.Item
              onClick={() => {
                //user can't delete his own profile..
                if (user.id === currentUser.id) {
                  return;
                }

                confirmAlert({
                  title: "Delete User",
                  message: "Are you sure you want to delete this User? You can't undo this action.",
                  buttons: [
                    {
                      label: "Yes, Proceed",
                      onClick: async () => {
                        await deleteDoc(doc(firestore, USERS_COLLECTION, user.id));
                        toast.success("You've deleted this User's account");
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
              Delete
            </Dropdown.Item>
          )}
        </Dropdown>
      </Table.Cell>
    </Table.Row>
  );
};

const AllUsers = () => {
  const allUsers = useAppSelector((state) => state.allUsers.allUsers);

  return (
    <UserLayout>
      <div className="p-10">
        <div className="flex justify-between mb-5">
          <h3 className="font-sans text-2xl font-medium">All Users</h3>
          <Link href="/admin/users/new">
            <Button>New User</Button>
          </Link>
        </div>

        <Table>
          <Table.Head>
            <Table.HeadCell>Name</Table.HeadCell>
            <Table.HeadCell>Email</Table.HeadCell>
            <Table.HeadCell>Role</Table.HeadCell>
            <Table.HeadCell>Reservations</Table.HeadCell>
            <Table.HeadCell>
              <span className="sr-only">Edit</span>
            </Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y">
            {map(allUsers, (user) => {
              return <UserRow user={user} key={user.id} />;
            })}
          </Table.Body>
        </Table>
      </div>
    </UserLayout>
  );
};

export default AllUsers;
