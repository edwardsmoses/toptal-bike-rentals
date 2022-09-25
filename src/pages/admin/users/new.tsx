import { UserLayout } from "components/layout/UserLayout";

import { Label, TextInput, Button, Spinner, Select, Breadcrumb } from "flowbite-react";
import { useRouter } from "next/router";
import { FormEvent, useEffect, useState } from "react";
import { addDoc, collection, doc, Timestamp, updateDoc } from "firebase/firestore";
import { auth, firestore } from "firebase-app/init";
import { USERS_COLLECTION } from "constants/collection";
import { toast } from "react-hot-toast";
import { useAppSelector } from "store/store";
import { selectUser } from "store/features/usersSlice";
import axios from "axios";

const NewUser = () => {
  const router = useRouter();
  const { id } = router.query;

  const state = useAppSelector((state) => state);
  const currentUser = useAppSelector((state) => state.currentUser.user);

  const [editUserId, setEditUserId] = useState("");

  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [role, setRole] = useState("");

  const [isAdding, setIsAdding] = useState(false);

  useEffect(() => {
    const currentUser = selectUser(state, (id as string) || "");
    if (currentUser) {
      setEditUserId(currentUser.id);
      setEmail(currentUser.email);
      setFullName(currentUser.fullName);
      setRole(currentUser.role!);
    }
  }, [id]);

  const handleAddNewUser = async (event: FormEvent) => {
    event.preventDefault();

    try {
      setIsAdding(true);

      if (editUserId) {
        const userRef = doc(firestore, USERS_COLLECTION, editUserId);
        await updateDoc(userRef, {
          fullName,
          role,
          updatedOn: Timestamp.now(),
          updatedBy: currentUser.id,
        });
      } else {
        const token = await auth.currentUser?.getIdToken();

        if (token) {
          const response = await axios.post(
            "/api/users/",
            { email: email },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          console.log(response);
        }

        // await addDoc(collection(firestore, USERS_COLLECTION), {
        //   email,
        //   fullName,
        //   role,
        //   addedBy: auth.currentUser?.uid || "",
        //   addedOn: Timestamp.now(),
        // });
      }

      // router.push("/admin/users");
      toast.success(`Awesome! User ${editUserId ? "updated" : "added"} successfully.`);
    } catch (error) {
      toast.success(`Error ${editUserId ? "updating" : "adding"} user.`);
    } finally {
      setIsAdding(false);
    }
  };

  return (
    <UserLayout>
      <Breadcrumb className="px-5 py-3 bg-gray-50 dark:bg-gray-900">
        <Breadcrumb.Item href="/admin/">Dashboard</Breadcrumb.Item>
        <Breadcrumb.Item href="/admin/users">All Users</Breadcrumb.Item>
      </Breadcrumb>

      <div className="p-10">
        <h3 className="font-sans text-2xl font-medium">{editUserId ? "Edit" : "Add New"} User</h3>

        <form action="#" className="grid grid-cols-6 gap-6 mt-8" onSubmit={handleAddNewUser}>
          <div className="col-span-6">
            <Label htmlFor="fullName" value="Full Name" />
            <TextInput
              id="fullName"
              value={fullName}
              onChange={(event) => {
                setFullName(event.currentTarget.value);
              }}
              placeholder=""
              required={true}
            />
          </div>

          <div className="col-span-6">
            <Label htmlFor="email" value="Email" />
            <TextInput
              id="email"
              type="email"
              disabled={!!editUserId} //prevent editing of User's email..
              value={email}
              onChange={(event) => {
                setEmail(event.currentTarget.value);
              }}
              required={true}
            />
          </div>

          <div className="col-span-6">
            <Label htmlFor="role" value="Role" />
            <Select
              id="role"
              value={role}
              required={true}
              onChange={(event) => {
                setRole(event.currentTarget.value);
              }}
            >
              <option value="manager">Manager</option>
              <option value="user">User</option>
            </Select>
          </div>

          <div className="col-span-6 space-y-2">
            <Button type="submit" disabled={isAdding}>
              {isAdding && (
                <div className="mr-3">
                  <Spinner size="sm" light={true} />
                </div>
              )}
              {editUserId ? "Update" : "Add"} User
            </Button>
          </div>
        </form>
      </div>
    </UserLayout>
  );
};

export default NewUser;
