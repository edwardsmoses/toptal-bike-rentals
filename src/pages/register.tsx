import { AuthLayout } from "components/layout/AuthLayout";
import { USERS_COLLECTION } from "constants/collection";
import { auth, firestore } from "firebase-app/init";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc, Timestamp } from "firebase/firestore";
import { Label, TextInput, Checkbox, Button, Spinner } from "flowbite-react";
import Link from "next/link";
import { useRouter } from "next/router";
import { FormEvent, useState } from "react";
import toast from "react-hot-toast";

const Register = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  const router = useRouter();

  const signUp = (event: FormEvent) => {
    event.preventDefault();
    setIsProcessing(true);

    createUserWithEmailAndPassword(auth, email, password)
      .then(async (response) => {
        await setDoc(doc(firestore, USERS_COLLECTION, response.user.uid), {
          email,
          fullName,
          role: "user",
          addedOn: Timestamp.now(),
        });

        toast.success("Welcome to BikeRentals");
        router.push("/users/");
      })
      .catch((error) => {
        toast.error("Email is in use");
      })
      .finally(() => {
        setIsProcessing(false);
      });
  };

  return (
    <AuthLayout title="Welcome to BikeRentals">
      <form action="#" onSubmit={signUp} className="grid grid-cols-6 gap-6 mt-8">
        <div className="col-span-6">
          <Label htmlFor="fullName" value="Full Name" />
          <TextInput
            id="fullName"
            type="name"
            placeholder="Edwards"
            required={true}
            value={fullName}
            onChange={(event) => {
              setFullName(event.currentTarget.value);
            }}
          />
        </div>

        <div className="col-span-6">
          <Label htmlFor="email" value="Email" />
          <TextInput
            id="email"
            type="email"
            placeholder="edwards@bikerental.com"
            required={true}
            value={email}
            onChange={(event) => {
              setEmail(event.currentTarget.value);
            }}
          />
        </div>

        <div className="col-span-6">
          <Label htmlFor="password" value="Password" />
          <TextInput
            id="password"
            type="password"
            placeholder=""
            required={true}
            value={password}
            onChange={(event) => {
              setPassword(event.currentTarget.value);
            }}
          />
        </div>

        <div className="col-span-6 space-x-2">
          <Checkbox id="agree" required={true} />
          <Label htmlFor="agree">By creating an account, you agree to our terms and conditions.</Label>
        </div>

        <div className="col-span-6 space-y-2">
          <Button type="submit" disabled={isProcessing}>
            {isProcessing && (
              <div className="mr-3">
                <Spinner size="sm" light={true} />
              </div>
            )}
            Create an account
          </Button>

          <p className="mt-4 space-x-1 text-sm text-gray-500 sm:mt-0">
            <span>Already have an account?</span>
            <Link href="/login">
              <a className="text-gray-700 underline">Log in</a>
            </Link>
            .
          </p>
        </div>
      </form>
    </AuthLayout>
  );
};

export default Register;
