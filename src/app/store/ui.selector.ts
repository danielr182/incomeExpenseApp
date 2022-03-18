import { createFeatureSelector, createSelector } from "@ngrx/store";
import { State } from "./ui.reducer";

const uiFeatureKey = 'ui';
const uiFeatureSelector = createFeatureSelector<State>(uiFeatureKey);

const isLoadingSelector = createSelector(uiFeatureSelector, (state: State) => state.isLoading);

export const uiSelectors = { isLoadingSelector };
