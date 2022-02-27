// set auth token : thiết lập xác thực mã thông báo
import axios from 'axios' //giúp server và client nói chuyện với nhau

const setAuthToken = token => {
    if (token) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
    } else {  // ngược lại nếu cái Token này no/undefind tất là trong localstorage ko có thì xóa
        delete axios.defaults.headers.common['Authorization']
    }
}

export default setAuthToken


