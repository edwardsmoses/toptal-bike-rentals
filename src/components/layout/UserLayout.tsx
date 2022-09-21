import { AppLoader } from "components/appLoader/AppLoader";
import { Header } from "components/header/Header";
import { Sidebar } from "components/sidebar/Sidebar";

type Props = {
  children: React.ReactNode;
};
export const UserLayout = ({ children }: Props) => {
  return (
    <AppLoader>
      <div className="flex flex-row">
        <Sidebar />
        <div className="flex flex-col w-full">
          <Header />
          {children}
        </div>
      </div>
    </AppLoader>
  );
};
