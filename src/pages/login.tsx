import { AuthLayout } from "components/layout/AuthLayout";
import { auth } from "firebase-app/init";
import { signInWithEmailAndPassword } from "firebase/auth";
import { Label, TextInput, Checkbox, Button, Spinner } from "flowbite-react";
import Link from "next/link";
import { useRouter } from "next/router";
import { FormEvent, useState } from "react";
import { toast } from "react-hot-toast";

const Login = () => {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  const signIn = (event: FormEvent) => {
    event.preventDefault();
    setIsProcessing(true);

    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        toast.success("Welcome to BikeRentals");
        router.push("/users/");
      })
      .catch((error) => {
        toast.error("Email and/or password is invalid");
      })
      .finally(() => {
        setIsProcessing(false);
      });
  };

  return (
    <AuthLayout title="Sign In into BikeRentals">
      <form action="#" className="grid grid-cols-6 gap-6 mt-8" onSubmit={signIn}>
        <div className="col-span-6">
          <Label htmlFor="email" value="Email" />
          <TextInput
            id="email"
            type="email"
            value={email}
            onChange={(event) => {
              setEmail(event.currentTarget.value);
            }}
            placeholder="edwards@bikerental.com"
            required={true}
          />
        </div>

        <div className="col-span-6">
          <Label htmlFor="password" value="Password" />
          <TextInput
            id="password"
            type="password"
            value={password}
            onChange={(event) => {
              setPassword(event.currentTarget.value);
            }}
            placeholder=""
            required={true}
          />
        </div>

        <div className="col-span-6 space-y-2">
          <Button type="submit">
            {isProcessing && (
              <div className="mr-3">
                <Spinner size="sm" light={true} />
              </div>
            )}
            Sign in
          </Button>

          <p className="mt-4 space-x-1 text-sm text-gray-500 sm:mt-0">
            <span>Don't have an account?</span>
            <Link href="/register">
              <a className="text-gray-700 underline">Sign in</a>
            </Link>
            .
          </p>
        </div>
      </form>
    </AuthLayout>
  );
};

export default Login;
