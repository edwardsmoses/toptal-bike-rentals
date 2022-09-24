import { BIKES_COLLECTION } from "constants/collection";
import { auth, firestore } from "firebase-app/init";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { Bike } from "models/model";
import { bikesActions } from "store/features/bikesSlice";
import { AppThunk } from "store/store";

export const startAppDataLoad = (): AppThunk<void> => {
  return (dispatch) => {
    const listeners = [];

    const currentUserId = auth.currentUser?.uid || "";

    listeners.push(getAllBikes(dispatch));
    listeners.push(getCurrentUserBikes(currentUserId, dispatch));

    return listeners;
  };
};

const getAllBikes = (dispatch: Function) => {
  const q = query(collection(firestore, BIKES_COLLECTION));
  const unsubscribe = onSnapshot(q, (querySnapshot) => {
    const bikes: Bike[] = [];
    querySnapshot.forEach((doc) => {
      bikes.push(doc.data() as Bike);
    });
    dispatch(bikesActions.setBikes(bikes));
  });
  return unsubscribe;
};

const getCurrentUserBikes = (currentUserId: string, dispatch: Function) => {
  const q = query(collection(firestore, BIKES_COLLECTION), where("addedBy", "==", currentUserId));
  const unsubscribe = onSnapshot(q, (querySnapshot) => {
    const bikes: Bike[] = [];
    querySnapshot.forEach((doc) => {
      bikes.push(doc.data() as Bike);
    });
    dispatch(bikesActions.setBikes(bikes));
  });
  return unsubscribe;
};
