import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

const CustomDialog = (props) => {
  
	const handleDisagree = () => {
		props.dialogOpenSetter(false);
		props.setter(false);
	}

	const handleAgree = () => {
		props.dialogOpenSetter(false);
		props.setter(true);
		props.additionalFunction();
	}

	return (
		<Dialog
        	open={props.dialogOpen}
        	onClose={handleDisagree}
        	aria-labelledby="alert-dialog-title"
        	aria-describedby="alert-dialog-description"
      >
			<DialogTitle id="alert-dialog-title">
				{props.title}
			</DialogTitle>
			<DialogContent>
			<DialogContentText id="alert-dialog-description">
				{props.mainText}
			</DialogContentText>
			</DialogContent>
			<DialogActions>
			<Button onClick={handleDisagree}>{props.disagreeButtonText}</Button>
			<Button onClick={handleAgree} autoFocus>
				{props.agreeButtonText}
			</Button>
			</DialogActions>
      	</Dialog>
	)
}

export default CustomDialog;