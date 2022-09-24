import { UserLayout } from "components/layout/UserLayout";
import { Button, Table } from "flowbite-react";
import { capitalize, map } from "lodash";
import Link from "next/link";
import { useAppSelector } from "store/store";

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
            <Table.HeadCell>
              <span className="sr-only">Edit</span>
            </Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y">
            {map(allUsers, (user) => {
              return (
                <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800" key={user.id}>
                  <Table.Cell className="font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {user.fullName}
                  </Table.Cell>
                  <Table.Cell>{user.email}</Table.Cell>
                  <Table.Cell>{capitalize(user.role)}</Table.Cell>
                  <Table.Cell>
                    <a href="/" className="font-medium text-blue-600 hover:underline dark:text-blue-500">
                      Edit
                    </a>
                  </Table.Cell>
                </Table.Row>
              );
            })}
          </Table.Body>
        </Table>
      </div>
    </UserLayout>
  );
};

export default AllUsers;
