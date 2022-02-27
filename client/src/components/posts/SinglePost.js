import Card from 'react-bootstrap/Card'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Badge from 'react-bootstrap/Badge'
import ActionButtons from './ActionButtons'

    //post là lấy ra các cái _id, status, ... như bên dưới
const SinglePost = ({ post: { _id, status, title, description, url } }) => (
	<Card
		className='shadow'
		border={ // ta có 2 trạng thái là LEARNED và LEARNING xuất ra warning ngược lại xuất ra danger
			status === 'LEARNED'
				? 'success'
				: status === 'LEARNING'
				? 'warning'
				: 'danger'
		}
	>
		<Card.Body>
			<Card.Title>
				<Row>
					<Col>
						<p className='post-title'>{title}</p>
						<Badge
							pill
							variant={
								status === 'LEARNED'
									? 'success'
									: status === 'LEARNING'
									? 'warning'
									: 'danger'
							}
						>
							{status}
						</Badge>
					</Col>
					
					<Col className='text-right'/*đưa tất cả mọi thứ trong cái col này sang phải */> 
						<ActionButtons url={url} _id={_id} />
					</Col>
				</Row>
			</Card.Title>
			<Card.Text>{description}</Card.Text>
		</Card.Body>
	</Card>
)

export default SinglePost