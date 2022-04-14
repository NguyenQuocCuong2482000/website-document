import { PostContext } from '../contexts/PostContext'
import { AuthContext } from '../contexts/AuthContext'
import { useContext, useEffect } from 'react'
import Spinner from 'react-bootstrap/Spinner'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import Row from 'react-bootstrap/Row'
import Toast from 'react-bootstrap/Toast'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Tooltip from 'react-bootstrap/Tooltip'
import Col from 'react-bootstrap/Col'
import SinglePost from '../components/posts/SinglePost'
import AddPostModal from '../components/posts/AddPostModal'
import UpdatePostModal from '../components/posts/UpdatePostModal'
import addIcon from '../assets/plus-circle-fill.svg'

const Dashboard = () => {
	// Contexts
	const {
		authState: { //lấy ra user sau đó lấy sâu hơn tý là username
			user: { username }
		}
	} = useContext(AuthContext)

	const {
		postState: { post, posts, postsLoading },
		getPosts,
		setShowAddPostModal,
		showToast: { show, message, type },
		setShowToast
	} = useContext(PostContext)

	// Start: Get all posts
	useEffect(() => getPosts(), [])

	let body = null
    //hiển thị các cái post ra giao diện, đang load thì hiện biểu tượng xoay tròn
	if (postsLoading) {
		body = (
			<div className='spinner-container'>
				<Spinner animation='border' variant='info' />
			</div>
		)
	} else if (posts.length === 0) { //kiểm tra tài khoản này có post nào hay chưa
		body = (
			<>
				<Card className='text-center mx-5 my-5'>
					<Card.Header as='h1'>Chào {username}</Card.Header>
					<Card.Body>
						<Card.Title>Chào mừng bạn đến với nơi quản lí tài liệu của bạn!</Card.Title>
						<Card.Text>
						Nhấp vào nút bên dưới để thêm kỹ năng đầu tiên bạn muốn học
						</Card.Text>
						<Button
							variant='primary'
							onClick={setShowAddPostModal.bind(this, true)}
						>
							Học!
						</Button>
					</Card.Body>
				</Card>
			</>
		)
	} else {
		body = ( //row-cols-1 tạo ra một cột, row-cols-md-3 khi kích cỡ tối thiểu thì có 3 cột
                //g-4 khoảng cách giữa các cột và dòng , mx-auto đưa ra giữa, mt-3 cách phía trên
			<>  
				<Row className='row-cols-1 row-cols-md-3 g-4 mx-auto mt-3'>
					{posts.map(post => (
						<Col key={post._id} className='my-2'>
							<SinglePost post={post} />
						</Col>
					))}
				</Row>

				{/* Open Add Post Modal */}
				<OverlayTrigger
					placement='left' // nhảy sang phía bên trái
					overlay={<Tooltip>Add a new thing to learn</Tooltip>}
				>
					<Button
						className='btn-floating' //nút + đăng bài năm góc phải bên dưới
						onClick={setShowAddPostModal.bind(this, true)}
					>
						<img src={addIcon} alt='add-post' width='60' height='60' />
					</Button>
				</OverlayTrigger>
			</>
		)
	}

	return (
		<>
			{body}
			<AddPostModal />
			{post !== null && <UpdatePostModal />}
			{/* After post is added, show toast */}
			<Toast
				show={show}  // show dc móc ra từ showToast
				style={{ position: 'fixed', top: '20%', right: '10px' }}// bên góc phải màng hình
				className={`bg-${type} text-white`}  //${type} ví dụ type = cuong thì sẽ xuất ra cuong mà type ở đây nằm trong showToast
				onClose={setShowToast.bind(this, { //khi mà ta tắt nó đi thì cái showToast dc móc ra bên PostContext sẽ dc reset lại 
					show: false,
					message: '',
					type: null
				})}
				delay={3000}   //sau 3s thì cái "happy learning sẽ bị tắt đi"
				autohide
			>
				<Toast.Body>
					<strong>{message}</strong> {/*message động */}
				</Toast.Body>
			</Toast>
		</>
	)
}

export default Dashboard
