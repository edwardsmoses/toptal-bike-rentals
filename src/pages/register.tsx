import { AuthLayout } from "components/layout/AuthLayout";
import { Label, TextInput, Checkbox, Button } from "flowbite-react";
import Link from "next/link";

const Register = () => {
  return (
    <AuthLayout title="Welcome to BikeRentals">
      <form action="#" className="grid grid-cols-6 gap-6 mt-8">
        <div className="col-span-6">
          <Label htmlFor="fullName" value="Full Name" />
          <TextInput id="fullName" type="name" placeholder="Edwards" required={true} />
        </div>

        <div className="col-span-6">
          <Label htmlFor="email" value="Email" />
          <TextInput id="email" type="email" placeholder="edwards@bikerental.com" required={true} />
        </div>

        <div className="col-span-6">
          <Label htmlFor="password" value="Password" />
          <TextInput id="password" type="password" placeholder="" required={true} />
        </div>

        <div className="col-span-6 space-x-2">
          <Checkbox id="agree" required={true} />
          <Label htmlFor="agree">By creating an account, you agree to our terms and conditions.</Label>
        </div>

        <div className="col-span-6 space-y-2">
          <Button type="submit">Create an account</Button>

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
