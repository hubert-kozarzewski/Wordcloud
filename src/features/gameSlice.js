import { createSlice } from "@reduxjs/toolkit";
import words from "../mockapi_data/words";

export const gameSlice = createSlice({
    name: "game",
    initialState: {
        wordsSets: words,
        score: 0
    },  
    reducers: {
        setScore: (state, action) => {
            state.score = action.payload;
        },
    }
});

export const { setScore } = gameSlice.actions;

export default gameSlice.reducer;