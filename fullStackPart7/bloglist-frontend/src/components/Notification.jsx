import { useSelector, useDispatch } from "react-redux";

function Notification(){
	const message = useSelector(state => state.noti.message)

	return(
		<div>
			{message}
		</div>
	)
} 

export default Notification