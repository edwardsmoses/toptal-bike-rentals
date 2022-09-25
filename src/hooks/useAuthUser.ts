import { useEffect, useState } from "react";
import { onAuthStateChanged, User as AuthUser } from "firebase/auth";
import { auth } from "firebase-app/init";
import { useAppDispatch } from "store/store";
import { startAppDataLoad } from "store/thunks/listenerThunk";
import { map } from "lodash";
import { User, UserRole } from "models/model";
import { useRouter } from "next/router";

export const useAuthUser = () => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  const dispatch = useAppDispatch();

  const router = useRouter();

  const currentRoute = router.pathname.split("/")[1];
  const roleRoutes: Record<UserRole, string> = {
    manager: "admin",
    user: "users",
  };

  const redirectUserToRoute = (userRole: UserRole) => {
    if (userRole !== currentRoute) {
      return router.replace(`/${roleRoutes[userRole]}`);
    }
  };

  useEffect(() => {
    let dataListeners: Array<Function> = [];
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const listeners = (await dispatch(
          startAppDataLoad(
            () => {
              setLoading(true);
            },
            async (userRole) => {
              await redirectUserToRoute(userRole);
              setTimeout(() => {
                setLoading(false);
              }, 1000);
            }
          )
        )) as any;

        dataListeners = listeners;
        setUser(user);
      } else {
        setUser(null);
        setLoading(false);
      }
    });

    return () => {
      unsubscribe();
      map(dataListeners, (listener) => listener && listener()); //unsubscribe firestore data listeners.
    };
  }, []);

  return { user, loading };
};
