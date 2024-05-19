import { createFeatureSelector, createSelector } from "@ngrx/store";
import { State } from "./auth.reducer";

const authFeatureKey = 'auth';
const authFeatureSelector = createFeatureSelector<State>(authFeatureKey);

const userAuthSelector = createSelector(authFeatureSelector, (state: State) => state.user);

export const authSelectors = { userAuthSelector };
