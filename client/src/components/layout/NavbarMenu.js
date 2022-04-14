import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import learnItLogo from '../../assets/logo.svg'
import logoutIcon from '../../assets/logout.svg'
import Button from 'react-bootstrap/Button'
import { Link } from 'react-router-dom'
import { AuthContext } from '../../contexts/AuthContext'
import { useContext } from 'react'


const NavbarMenu = () => {
	const {
		authState: {
			user: { username }
		},
		logoutUser
	} = useContext(AuthContext)

	const logout = () => logoutUser()

	return (
		<Navbar expand='lg'  variant='dark' className='thanhnav1'>
			<Navbar.Brand className='font-weight-bolder text-white'>
				<img
					src={learnItLogo}
					alt='learnItLogo'
					width='32'
					height='32'
					className='mr-2'
				/>
				Tự Học Online
			</Navbar.Brand>

			<Navbar.Toggle aria-controls='basic-navbar-nav' // thanh navbar kiểu 3 đường sọc
              /> 

			<Navbar.Collapse id='basic-navbar-nav'>
				<Nav className='mr-auto'>
					<Nav.Link
						className='font-weight-bolder'
						to='/dashboard'
						as={Link}
					>
						Trang chủ
					</Nav.Link>

					

					<Nav.Link
						className='font-weight-bolder'
						to='/about'
						as={Link}
					>
						Hỗ trợ
					</Nav.Link>
				</Nav>

				<Nav>
					<Nav.Link className='font-weight-bolder text-white' disabled>
						Chào {username}
					</Nav.Link>
					<Button
						variant='secondary'
						className='font-weight-bolder text-white'
						onClick={logout}
					>
						<img
							src={logoutIcon}
							alt='logoutIcon'
							width='32'
							height='32'
							className='mr-2'
						/>
						Logout
					</Button>
				</Nav>
			</Navbar.Collapse>
		</Navbar>
	)
}

export default NavbarMenu
