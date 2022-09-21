import { AppLoader } from "components/appLoader/AppLoader";

type Props = {
  children: React.ReactNode;
};
export const UserLayout = ({ children }: Props) => {
  return <AppLoader>{children}</AppLoader>;
};
