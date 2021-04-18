import React, { createContext, useContext, useEffect, useReducer } from 'react';
import axios from 'axios';
import { User } from '../types';

interface State {
    authenticated: boolean
    user: User | null
    loading: boolean
}

interface Action {
    type: string
    payload: any
}


const StateContext = createContext<State>({
    authenticated: false,
    user: null,
    loading: true,
})

const DispatchContext = createContext<any>(null)


const reducer = (state: State, { type, payload }: Action) => {
    switch (type) {
        case 'LOGIN':
            return {
                ...state,
                authenticated: true,
                user: payload,
            }
        case 'REGISTER':
            return {
                ...state,
                authenticated: true,
                user: payload,
            }
        case 'REFRESH':
            return {
                ...state,
                authenticated: true,
                user: payload,
            }
        case 'LOGOUT':
            return {
                ...state,
                authenticated: false,
                user: null,
                loading: false
            }
        case 'STOP_LOADING':
            return {
                ...state,
                loading: false
            }
        default:
            throw new Error(`Unknow action type: ${type}`)
    }
}

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [state, defaultDispatch] = useReducer(reducer, {
        user: null,
        authenticated: false,
        loading: true,
    })

    const dispatch = (type: string, payload?: any) => defaultDispatch({ type, payload })

    useEffect(() => {
        async function loadUser() {
            try {
                const res = await axios.get('/auth/refresh')
                dispatch('REFRESH', res.data)
            } catch (err) {
                console.log(err)
            } finally {
                dispatch('STOP_LOADING')
            }
        }
        loadUser()
    }, [])

    return (
        <DispatchContext.Provider value={dispatch}>
            <StateContext.Provider value={state}>{children}</StateContext.Provider>
        </DispatchContext.Provider>
    )
}

export const useAuthState = () => useContext(StateContext)
export const useAuthDispatch = () => useContext(DispatchContext)