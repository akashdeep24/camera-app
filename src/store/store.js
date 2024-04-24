import { configureStore, createSlice } from '@reduxjs/toolkit';
const initialState = {
  images: []
}

const imageSlice = createSlice({
  name: 'images',
  initialState,
  reducers: {
    addImage: (state, action) => {
      state.images.push(action.payload);
    },
    deleteImage: (state, action) => {
      state.images = state.images.filter(image => image.id !== action.payload);
    },
  },
});

const rootReducer = imageSlice.reducer;

export const { addImage, deleteImage } = imageSlice.actions;

const store = configureStore({
  reducer: rootReducer,
});

export default store;
