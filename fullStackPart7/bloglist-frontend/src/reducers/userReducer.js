import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
	name: 'user',
	initialState: {},
	reducers: {
		setUser: (state, action) => {
			return {...state, user: action.payload}
		},
		setUsers: (state, action) => {
			return {...state, users: action.payload}
		}
	}
})

export const { setUser, setUsers } = userSlice.actions
export default userSlice.reducer