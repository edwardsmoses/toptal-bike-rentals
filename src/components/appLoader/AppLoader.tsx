import React, { useEffect, useState } from "react";

import { useAuthUser } from "hooks/useAuthUser";
import { Spinner } from "flowbite-react";
import Login from "pages/login";

type AppLoaderProps = {
  children: React.ReactNode;
};

export const AppLoader = ({ children }: AppLoaderProps) => {
  const { user, loading } = useAuthUser();

  if (typeof window === "undefined" || loading) {
    return <Spinner size="xl" />;
  }

  if (!loading && !user) {
    return <Login />;
  }

  return <>{children}</>;
};
