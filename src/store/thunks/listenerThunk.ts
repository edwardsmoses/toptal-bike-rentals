import { BIKES_COLLECTION, RESERVATIONS_COLLECTION, USERS_COLLECTION } from "constants/collection";
import { auth, firestore } from "firebase-app/init";
import { collection, doc, getDoc, onSnapshot, query, where } from "firebase/firestore";
import { Bike, BikeReservation, User } from "models/model";
import { bikesActions } from "store/features/bikesSlice";
import { currentUserActions } from "store/features/currentUserSlice";
import { usersActions } from "store/features/usersSlice";
import { AppThunk } from "store/store";

export const startAppDataLoad = (onLoadUserCompleteCallback: () => void): AppThunk<void> => {
  return async (dispatch) => {
    const listeners = [];

    const currentUserId = auth.currentUser?.uid || "";

    const currentUser = await getCurrentUser(currentUserId, dispatch);
    onLoadUserCompleteCallback();

    if (currentUser.role === "manager") {
      listeners.push(getAllUsers(dispatch));
      listeners.push(getAllReservations(dispatch));
    } else {
      listeners.push(getCurrentUserReservations(currentUserId, dispatch));
    }

    listeners.push(getAllBikes(dispatch));

    return listeners;
  };
};

const getCurrentUser = async (currentUserId: string, dispatch: Function) => {
  const docRef = doc(firestore, USERS_COLLECTION, currentUserId);
  const docSnap = await getDoc(docRef);

  dispatch(
    currentUserActions.updateCurrentUser({
      ...(docSnap.data() as User),
      id: currentUserId,
    })
  );

  return {
    ...(docSnap.data() as User),
  };
};

const getAllReservations = (dispatch: Function) => {
  const q = query(collection(firestore, RESERVATIONS_COLLECTION));
  const unsubscribe = onSnapshot(q, (querySnapshot) => {
    const reservations: BikeReservation[] = [];
    querySnapshot.forEach((doc) => {
      reservations.push({
        ...(doc.data() as BikeReservation),
        id: doc.id,
      });
    });
    dispatch(bikesActions.setReservations(reservations));
  });
  return unsubscribe;
};

const getCurrentUserReservations = (currentUserId: string, dispatch: Function) => {
  const q = query(collection(firestore, RESERVATIONS_COLLECTION), where("reservedBy", "==", currentUserId));
  const unsubscribe = onSnapshot(q, (querySnapshot) => {
    const reservations: BikeReservation[] = [];
    querySnapshot.forEach((doc) => {
      reservations.push({
        ...(doc.data() as BikeReservation),
        id: doc.id,
      });
    });
    dispatch(bikesActions.setReservations(reservations));
  });
  return unsubscribe;
};

const getAllUsers = (dispatch: Function) => {
  const q = query(collection(firestore, USERS_COLLECTION));
  const unsubscribe = onSnapshot(q, (querySnapshot) => {
    const users: User[] = [];
    querySnapshot.forEach((doc) => {
      users.push({
        ...(doc.data() as User),
        id: doc.id,
      });
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
      bikes.push({
        ...(doc.data() as Bike),
        id: doc.id,
      });
    });
    dispatch(bikesActions.setBikes(bikes));
  });
  return unsubscribe;
};
