// gameSlice.js
import axios from 'axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
  data: {
    name: [],
    videos: [],
  },
  isLoading: false,
  error: null,
};

export const fetchVideos = createAsyncThunk('video/fetchVideos', async (sub_category_id) => {
  try {
    const response = await axios.get('https://oor.toon-flix.com/api/id', { params: { sub_category_id: sub_category_id } });
    return response.data;
  } catch (error) {
    throw error;
  }
});

export const fetchVideosId = createAsyncThunk('video/fetchVideosId', async (id) => {
  try {
    const response = await axios.get(`https://oor.toon-flix.com/api/video/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
});

const Slice = createSlice({
  name: 'video',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchVideosId.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchVideosId.fulfilled, (state, action) => {
        console.log('Fetched Videos id:', action.payload);
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(fetchVideosId.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(fetchVideos.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchVideos.fulfilled, (state, action) => {
        console.log('Fetched Videos:', action.payload);
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(fetchVideos.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export default Slice.reducer;
