// nó như một cái component bọc 1 cái component khác mà component ở đây là route của chúng ta
import {Route, Redirect} from 'react-router-dom'
import {useContext} from 'react'
import { AuthContext } from '../../contexts/AuthContext' //đẩy người dùng ra nếu chưa loading
import Spinner from 'react-bootstrap/Spinner'
import NavbarMenu from '../layout/NavbarMenu'

//rest là cái link tên dashboard or một cái link cái tùy bạn đặt
//Component sau dấu 2 chấm là dc đổi tên thành như vậy (Component)
const ProtectedRoute = ({component: Component, ...rest}) => {
    const {
		authState: { authLoading, isAuthenticated }
	} = useContext(AuthContext)

    if (authLoading) 
    return (
        <div className="spinner-container">
            <Spinner animation='border' variant='info' />
        </div>
    )

    return (
		<Route
			{...rest}
			render={props =>
				isAuthenticated ? (
					<>
						<NavbarMenu />
						<Component {...rest} {...props} />
					</>
				) : (
					<Redirect to='/login' />
				)
			}
		/>
	)
}

export default ProtectedRoute


