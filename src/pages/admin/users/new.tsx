import { UserLayout } from "components/layout/UserLayout";

import { Label, TextInput, Button, Spinner, Select } from "flowbite-react";
import { useRouter } from "next/router";
import { FormEvent, useState } from "react";
import { addDoc, collection, Timestamp } from "firebase/firestore";
import { auth, firestore } from "firebase-app/init";
import { USERS_COLLECTION } from "constants/collection";
import { toast } from "react-hot-toast";

const NewUser = () => {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [role, setRole] = useState("");

  const [isAdding, setIsAdding] = useState(false);

  const handleAddNewUser = async (event: FormEvent) => {
    event.preventDefault();

    try {
      setIsAdding(true);
      await addDoc(collection(firestore, USERS_COLLECTION), {
        email,
        fullName,
        role,
        addedBy: auth.currentUser?.uid || "",
        addedOn: Timestamp.now(),
      });
      router.push("/admin/users");
      toast.success("Awesome! New user added successfully.");
    } catch (error) {
      toast.error("There was an error while adding the User");
    } finally {
      setIsAdding(false);
    }
  };

  return (
    <UserLayout>
      <div className="p-10">
        <h3 className="font-sans text-2xl font-medium">Add New User</h3>

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
              required={true}
              onChange={(event) => {
                setRole(event.currentTarget.value);
              }}
            >
              <option>Manager</option>
              <option>User</option>
            </Select>
          </div>

          <div className="col-span-6 space-y-2">
            <Button type="submit" disabled={isAdding}>
              {isAdding && (
                <div className="mr-3">
                  <Spinner size="sm" light={true} />
                </div>
              )}
              Add User
            </Button>
          </div>
        </form>
      </div>
    </UserLayout>
  );
};

export default NewUser;
