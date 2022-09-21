import { AuthLayout } from "components/layout/AuthLayout";
import { Label, TextInput, Checkbox, Button } from "flowbite-react";
import Link from "next/link";

const Login = () => {
  return (
    <AuthLayout title="Sign In into BikeRentals">
      <form action="#" className="grid grid-cols-6 gap-6 mt-8">
        <div className="col-span-6">
          <Label htmlFor="email" value="Email" />
          <TextInput id="email" type="email" placeholder="edwards@bikerental.com" required={true} />
        </div>

        <div className="col-span-6">
          <Label htmlFor="password" value="Password" />
          <TextInput id="password" type="password" placeholder="" required={true} />
        </div>

        <div className="col-span-6 space-y-2">
          <Button type="submit">Sign in</Button>

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
