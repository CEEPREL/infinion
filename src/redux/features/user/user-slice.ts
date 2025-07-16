import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { User, UserState } from "../../types/user-type";

// initial state is the initial state of the slice before the users are fetched asynchronusly
const initialState: UserState = {
  users: [],
  loading: false,
  error: null,

  creating: false,
  createError: null,

  selectedUser: null,
  selectedLoading: false,
  selectedError: null,
};

// fetchusers uses RTK createAsyncThunk lifecycle to fetch all users from the endpoint
export const fetchUsers = createAsyncThunk("user/fetchUsers", async () => {
  const res = await fetch(
    "https://687124747ca4d06b34b97d3d.mockapi.io/api/userId"
  );
  return (await res.json()) as User[];
});

// fetchUserById uses RTK createAsyncThunk lifecycle to fetch users by ID from the endpoint
export const fetchUserById = createAsyncThunk(
  "user/fetchUserById",
  async (id: string, { rejectWithValue }) => {
    try {
      const res = await fetch(
        `https://687124747ca4d06b34b97d3d.mockapi.io/api/userId/${id}`
      );
      if (!res.ok) throw new Error("Failed to fetch user");
      return await res.json();
    } catch (error: any) {
      return rejectWithValue(error.message || "Unknown error");
    }
  }
);

export const createUser = createAsyncThunk(
  "user/createUser",
  async (
    user: { name: string; location: string; dob: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await fetch(
        "https://687124747ca4d06b34b97d3d.mockapi.io/api/userId",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(user),
        }
      );
      if (!response.ok) throw new Error("Failed to create user");
      return await response.json();
    } catch (error: any) {
      return rejectWithValue(error.message || "Unknown error");
    }
  }
);

// userSlice is the slice of the store that contains the users, loading and error state by using the RTKß createSlice function
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    resetError(state) {
      state.error = null;
    },
  },

  // extraReducers is used to handle the lifecycle of the fetchUsers thunk, like pending, fulfilled and rejected
  extraReducers: (builder) => {
    builder.addCase(fetchUsers.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      state.loading = false;
      state.users = action.payload;
    });
    builder.addCase(fetchUsers.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message ?? "Failed to fetch";
    });
    builder
      .addCase(createUser.pending, (state) => {
        state.creating = true;
        state.createError = null;
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.creating = false;
        state.users.push(action.payload);
      })
      .addCase(createUser.rejected, (state, action) => {
        state.creating = false;
        state.createError = action.payload as string;
      });
    builder
      .addCase(fetchUserById.pending, (state) => {
        state.selectedLoading = true;
        state.selectedError = null;
      })
      .addCase(fetchUserById.fulfilled, (state, action) => {
        state.selectedLoading = false;
        state.selectedUser = action.payload;
      })
      .addCase(fetchUserById.rejected, (state, action) => {
        state.selectedLoading = false;
        state.selectedError = action.payload as string;
      });
  },
});

export const { resetError } = userSlice.actions;
export default userSlice.reducer;
