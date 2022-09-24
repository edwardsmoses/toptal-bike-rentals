import { BIKES_COLLECTION, USERS_COLLECTION } from "constants/collection";
import { auth, firestore } from "firebase-app/init";
import { collection, doc, onSnapshot, query, where } from "firebase/firestore";
import { Bike, User } from "models/model";
import { bikesActions } from "store/features/bikesSlice";
import { currentUserActions } from "store/features/currentUserSlice";
import { usersActions } from "store/features/usersSlice";
import { AppThunk } from "store/store";

export const startAppDataLoad = (): AppThunk<void> => {
  return (dispatch) => {
    const listeners = [];

    const currentUserId = auth.currentUser?.uid || "";

    //get current user doc..
    listeners.push(getCurrentUser(currentUserId, dispatch));

    listeners.push(getAllUsers(dispatch));

    listeners.push(getAllBikes(dispatch));
    listeners.push(getCurrentUserBikes(currentUserId, dispatch));

    return listeners;
  };
};

const getCurrentUser = (currentUserId: string, dispatch: Function) => {
  const unsubscribe = onSnapshot(doc(firestore, USERS_COLLECTION, currentUserId), (doc) => {
    dispatch(
      currentUserActions.updateCurrentUser({
        ...(doc.data() as User),
      })
    );
  });
  return unsubscribe;
};

const getAllUsers = (dispatch: Function) => {
  const q = query(collection(firestore, USERS_COLLECTION));
  const unsubscribe = onSnapshot(q, (querySnapshot) => {
    const users: User[] = [];
    querySnapshot.forEach((doc) => {
      users.push(doc.data() as User);
    });
    dispatch(usersActions.setUsers(users));
  });
  return unsubscribe;
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
