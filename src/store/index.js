import { configureStore } from '@reduxjs/toolkit'
import newsSlice from '../features/newsSlice'
import getNestedComments from '../features/commentsSlice'

const store = configureStore({
  reducer: {
    newsSlice,
    getNestedComments
  }

})

export default store