import { configureStore, createSlice } from "@reduxjs/toolkit";

const initialStateManu = { roleManu: "" }
const initialStateSupp = { roleSupp: "" }
const initialStateCust = { roleCust: "" }

const manuSlice = createSlice({
    name: "manu",
    initialState: initialStateManu,
    reducers: {
        getRoleM(state) {
            return {...state, roleManu: "Manufacturer" };
        }
    }
})
const suppSlice = createSlice({
    name: "supp",
    initialState: initialStateSupp,
    reducers: {
        getRoleS(state) {
            return {...state, roleSupp: "Supplier" };
        }
    }
})
const custSlice = createSlice({
    name: "cust",
    initialState: initialStateCust,
    reducers: {
        getRoleC(state) {
            return {...state, roleCust: "Customer" };
        }
    }
})

const store = configureStore({ reducer: { manu: manuSlice.reducer, supp: suppSlice.reducer, cust: custSlice.reducer } });

export const manuActions = manuSlice.actions;
export const suppActions = suppSlice.actions;
export const custActions = custSlice.actions;

export default store;