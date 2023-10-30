import { createSlice } from '@reduxjs/toolkit'

const notiSlice = createSlice({
  name: 'noti',
  initialState: {
    message: 'hi world',
  },
  reducers: {
    setNoti: (state, action) => {
      state.message = action.payload
    },
  },
})

export const { setNoti } = notiSlice.actions

export default notiSlice.reducer
