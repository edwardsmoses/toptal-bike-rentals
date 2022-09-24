import { useEffect, useState } from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "firebase-app/init";
import { useAppDispatch } from "store/store";
import { startAppDataLoad } from "store/thunks/listenerThunk";
import { map } from "lodash";

export const useAuthUser = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const dispatch = useAppDispatch();

  useEffect(() => {
    let dataListeners: Array<Function> = [];
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);

        dataListeners = dispatch(startAppDataLoad()) as unknown as Array<Function>;
        setLoading(false);
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
