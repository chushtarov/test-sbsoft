import { configureStore } from '@reduxjs/toolkit'
import newsSlice from '../features/newsSlice'

const store = configureStore({
  reducer: newsSlice,
})

export default store