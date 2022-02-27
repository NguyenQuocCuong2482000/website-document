//postReducer ví dụ là khi bạn xóa một bài đăng bạn phải f5 nó mới mất nhưng khi bạn code delete ở đây nó sẽ xóa ngay lập tức
import {
	POSTS_LOADED_SUCCESS,
	POSTS_LOADED_FAIL,
	ADD_POST,
	DELETE_POST,
	UPDATE_POST,
	FIND_POST
} from '../contexts/constants'

export const postReducer = (state, action) => {
	const { type, payload } = action
	switch (type) {
		case POSTS_LOADED_SUCCESS:
			return {
				...state,
				posts: payload,
				postsLoading: false
			}

		case POSTS_LOADED_FAIL:
			return {
				...state,
				posts: [],
				postsLoading: false
			}

		case ADD_POST:
			return {
				...state,
				posts: [...state.posts, payload]
			}

		case DELETE_POST:
			return {
				...state,
				posts: state.posts.filter(post => post._id !== payload)
			}

		case FIND_POST:
			return { ...state, post: payload }   //...state là những thứ đang có sẵn

		case UPDATE_POST:
			const newPosts = state.posts.map(post =>
				post._id === payload._id ? payload : post // ? là return payload : là ngược lại return post
			)

			return {
				...state,
				posts: newPosts
			}

		default:
			return state
	}
}
