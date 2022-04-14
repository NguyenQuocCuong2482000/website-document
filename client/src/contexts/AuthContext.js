//AuthContext là hàm dùng để quản lý tất cả những việc liên quan đến login logout register
import { createContext, useReducer, useEffect } from "react"
import {authReducer} from '../reducers/authReducer'
import {apiUrl, LOCAL_STORAGE_TOKEN_NAME} from './constants'
import axios from 'axios'   //nói chuyện với backend thông qua axios
import setAuthToken from "../utils/setAuthToken"


export const AuthContext = createContext()

const AuthContextProvider = ({children}) => {
    const [authState, dispatch] = useReducer(authReducer, {
        authLoading: true, 
        isAuthenticated: false,
        user: null
    })

    // Authenticate user (Xác thực người dùng)
    const loadUser = async () =>{  //muốn dùng await thì phải có async, nó khai báo một hàm bất đồng bộ 
        if (localStorage[LOCAL_STORAGE_TOKEN_NAME]) {
            setAuthToken(localStorage[LOCAL_STORAGE_TOKEN_NAME])
        }

        try { //xác thực với server
            const response = await axios.get(`${apiUrl}/auth`)  // await chờ dòng lệnh kết thúc
            if (response.data.success) {
                dispatch({
                    type: 'SET_AUTH', 
                    payload: {isAuthenticated: true, user: response.data.user}})
            }
        } catch (error) { //bạn chỉ có một lần xác thực bản thân nếu bạn ko xác thực dc thì tôi sẽ xóa hết toàn bộ action trong localstarage của các bạn
            localStorage.removeItem(LOCAL_STORAGE_TOKEN_NAME)
            setAuthToken(null)
            dispatch({
                type: 'SET_AUTH', 
                payload: { isAuthenticated: false, user: null}
            })
        }
    }

    useEffect(() => loadUser(), [])

    // Login
	const loginUser = async userForm => {
		try {
			const response = await axios.post(`${apiUrl}/auth/login`, userForm)
			if (response.data.success)
				localStorage.setItem(
					LOCAL_STORAGE_TOKEN_NAME,
					response.data.accessToken
				)

			await loadUser()    // await chờ loadUser

			return response.data  // sau khi load xong tra về dữ liệu
		} catch (error) {
			if (error.response.data) return error.response.data
			else return { success: false, message: error.message }
		}
	}

    // Register
	const registerUser = async userForm => {
		try {
			const response = await axios.post(`${apiUrl}/auth/register`, userForm)
			if (response.data.success)
				localStorage.setItem(
					LOCAL_STORAGE_TOKEN_NAME,
					response.data.accessToken
				)

			await loadUser()

			return response.data
		} catch (error) {
			if (error.response.data) return error.response.data
			else return { success: false, message: error.message }
		}
	}

    // Logout
	const logoutUser = () => {
		localStorage.removeItem(LOCAL_STORAGE_TOKEN_NAME)
		dispatch({
			type: 'SET_AUTH',
			payload: { isAuthenticated: false, user: null }
		})
	}

    //context data
    const authContextData = { loginUser, registerUser, logoutUser, authState }

    // Return provider
    return (
        <AuthContext.Provider value={authContextData}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContextProvider



