import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { useContext, useState } from 'react'
import { PostContext } from '../../contexts/PostContext'

const AddPostModal = () => {
	// Contexts,   hiển thị nút  + để thêm bài đăng mới
	const { //const là dùng để móc ra các dữ liệu cần dùng
		showAddPostModal,
		setShowAddPostModal,
		addPost,
		setShowToast
	} = useContext(PostContext)

	// State
	const [newPost, setNewPost] = useState({
		title: '',
		description: '',
		url: '',
		status: 'TO LEARN'
	})

	const { title, description, url } = newPost

	const onChangeNewPostForm = event =>
		setNewPost({ ...newPost, [event.target.name]: event.target.value })

	const closeDialog = () => {
		resetAddPostData()
	}

	const onSubmit = async event => {
		event.preventDefault()
		const { success, message } = await addPost(newPost)
		resetAddPostData()
		setShowToast({ show: true, message, type: success ? 'success' : 'danger' }) // message dc móc ra từ cái message là kết quả của addPost
	}

	const resetAddPostData = () => {// khi bạn đăng bài, bạn nhập liệu và bấm thoát nó sẽ xóa các dữ liệu bạn vừa nhập
		setNewPost({ title: '', description: '', url: '', status: 'TO LEARN' })
		setShowAddPostModal(false)
	}

	return (
		<Modal show={showAddPostModal} onHide={closeDialog}/*show={showAddPostModal} là hiện cái nút  + để thêm bài đăng mới; onHide={closeDialog} là đóng trang lại */>  
			<Modal.Header closeButton /*cái nút này sẽ đóng cái modal lại */> 
				<Modal.Title>What do you want to learn?</Modal.Title>
			</Modal.Header>
			<Form onSubmit={onSubmit}>
				<Modal.Body>
					<Form.Group>
						<Form.Control
							type='text'
							placeholder='Title'
							name='title'
							required
							aria-describedby='title-help'
							value={title}
							onChange={onChangeNewPostForm}
						/>
						<Form.Text id='title-help' muted /*muted làm mờ chữ đi một chút */>
							Required
						</Form.Text>
					</Form.Group>
					<Form.Group>
						<Form.Control
							as='textarea'
							rows={3}    //cao lên 3 dòng
							placeholder='Description'
							name='description'
							value={description}
							onChange={onChangeNewPostForm}
						/>
					</Form.Group>
					<Form.Group>
						<Form.Control
							type='text'
							placeholder='Youtube Tutorial URL'
							name='url'
							value={url}
							onChange={onChangeNewPostForm}
						/>
					</Form.Group>
				</Modal.Body>
				<Modal.Footer>
					<Button variant='secondary' onClick={closeDialog}/*đóng trang bằng closeDialog */> 
						Thoát
					</Button>
					<Button variant='primary' type='submit'>
						Học!
					</Button>
				</Modal.Footer>
			</Form>
		</Modal>
	)
}

export default AddPostModal
