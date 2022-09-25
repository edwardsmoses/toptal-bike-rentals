import { AuthLayout } from "components/layout/AuthLayout";
import { auth } from "firebase-app/init";
import { sendPasswordResetEmail, signInWithEmailAndPassword } from "firebase/auth";
import { Label, TextInput, Checkbox, Button, Spinner } from "flowbite-react";
import Link from "next/link";
import { useRouter } from "next/router";
import { FormEvent, useState } from "react";
import { toast } from "react-hot-toast";

const Forgot = () => {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  const signIn = (event: FormEvent) => {
    event.preventDefault();
    setIsProcessing(true);

    sendPasswordResetEmail(auth, email)
      .then(() => {
        toast.success("We've sent you an email to reset your password");
        router.push("/login");
      })
      .finally(() => {
        setIsProcessing(false);
      });
  };

  return (
    <AuthLayout title="Forgot Password">
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


        <div className="col-span-6 space-y-2">
          <Button type="submit" disabled={isProcessing}>
            {isProcessing && (
              <div className="mr-3">
                <Spinner size="sm" light={true} />
              </div>
            )}
            Send me an Email
          </Button>

          <p className="mt-4 space-x-1 text-sm text-gray-500 sm:mt-0">
            <span>Remember your Password?</span>
            <Link href="/login">
              <a className="text-gray-700 underline">Login</a>
            </Link>
            .
          </p>
        </div>
      </form>
    </AuthLayout>
  );
};

export default Forgot;
