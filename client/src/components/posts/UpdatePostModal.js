import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { useContext, useState, useEffect } from 'react'
import { PostContext } from '../../contexts/PostContext'

const UpdatePostModal = () => {
	// Contexts
	const {
		postState: { post }, //trong dòng này cần phải có sẳn data của cái post nên ta sẽ thêm "post" vào
		showUpdatePostModal,
		setShowUpdatePostModal,
		updatePost,
		setShowToast       //sau khi người dùng update xong hiện thông báo chúc mừng 
	} = useContext(PostContext)

	// State
	const [updatedPost, setUpdatedPost] = useState(post)

	useEffect(() => setUpdatedPost(post), [post])  //fix lỗi bấm sữa bị lập lại mục khác, bấm vào hiện post mới

	const { title, description, url, status } = updatedPost

	const onChangeUpdatedPostForm = event =>
		setUpdatedPost({ ...updatedPost, [event.target.name]: event.target.value })

	const closeDialog = () => {
		setUpdatedPost(post)   // thiết lập lại cái post đang được sửa, kiểu như bạn thêm chữ vào nhưng ko lưu thì nó tự về như củ
		setShowUpdatePostModal(false) //khi bấm vào nút X/thoát sẽ văng ra
	}

	const onSubmit = async event => {
		event.preventDefault()
		const { success, message } = await updatePost(updatedPost)
		setShowUpdatePostModal(false)
		setShowToast({ show: true, message, type: success ? 'success' : 'danger' })
	}

	// const resetAddPostData = () => {
	// 	setNewPost({ title: '', description: '', url: '', status: 'TO LEARN' })
	// 	setShowAddPostModal(false)
	// }

	return (
		<Modal show={showUpdatePostModal} onHide={closeDialog}>
			<Modal.Header closeButton>
				<Modal.Title>Making progress?</Modal.Title>
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
							onChange={onChangeUpdatedPostForm}
						/>
						<Form.Text id='title-help' muted>
							Required
						</Form.Text>
					</Form.Group>
					<Form.Group>
						<Form.Control
							as='textarea'
							rows={3}
							placeholder='Description'
							name='description'
							value={description}
							onChange={onChangeUpdatedPostForm}
						/>
					</Form.Group>
					<Form.Group>
						<Form.Control
							type='text'
							placeholder='Youtube Tutorial URL'
							name='url'
							value={url}
							onChange={onChangeUpdatedPostForm}
						/>
					</Form.Group>
					<Form.Group>
						<Form.Control
							as='select'
							value={status}   //stauts dc móc ra từ dòng 22
							name='status'
							onChange={onChangeUpdatedPostForm}
						>
							<option value='TO LEARN'>TO LEARN</option>
							<option value='LEARNING'>LEARNING</option>
							<option value='LEARNED'>LEARNED</option>
							<option value='LEARNED'>LEARNED BASIC KNOWLEDGE</option>
							<option value='LEARNED'>LEARNED ADVANCED KNOWLEDGE</option>
						</Form.Control>
					</Form.Group>
				</Modal.Body>
				<Modal.Footer>
					<Button variant='secondary' onClick={closeDialog}>
						Cancel
					</Button>
					<Button variant='primary' type='submit'>
						LearnIt!
					</Button>
				</Modal.Footer>
			</Form>
		</Modal>
	)
}

export default UpdatePostModal
