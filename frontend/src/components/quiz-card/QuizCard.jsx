import './QuizCard.scss';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

const QuizCard = (props) => {
	const CardStyle = {
		backgroundColor: props.color
	}
	// console.log(props);
	return(
		<Card style={CardStyle} sx={{ minWidth: 275 }}>
			<CardContent>
				<Typography sx={{ fontSize: 22 }} color="text.primary" gutterBottom>
				{props.quizname !== '' ? props.quizname : "Nazwa quizu"}
				</Typography>
				<Typography variant="h5" component="div">
					{props.categoryName != null && props.categoryName['value'] ? props.categoryName['value'] : props.categoryName}
				</Typography>
				<Typography variant="body2">
				Ilość pytań: {props.questionCount}
				</Typography>
			</CardContent>
		</Card>
	)
}

export default QuizCard;