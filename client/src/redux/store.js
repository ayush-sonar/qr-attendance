import { configureStore } from "@reduxjs/toolkit";
// import { persistReducer, persistStore } from "redux-persist";
// import storage from "redux-persist/lib/storage";

import userReducer from "./userSlice";




// const persistedUserReducer = persistReducer(userPersistConfig, userReducer);



const store = configureStore({
  reducer: {
   
    user: userReducer, // Persisted user reducer
    
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Required for redux-persist
    }),
});

// export const persistor = persistStore(store);
export default store;
