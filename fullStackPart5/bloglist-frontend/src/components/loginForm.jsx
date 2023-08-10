import PropTypes from 'prop-types'

const LoginForm = ({
	handleSubmit,
	handleUsernameChange,
	handlePasswordChange,
	username,
	password,
	message
}) => {
	return(
		<form onSubmit={handleSubmit}>
				<h1> Login in to View BLogs </h1>
				<h2> {message}</h2>
			<div>
				Username: 
				<input 
				data-cy="username"
				name='Username'
				value={username}
				onChange={({target}) => handleUsernameChange(target.value)}
				/>
			</div>
			
			<div>
				Password: 
				<input 
				data-cy="password"
				name='Password'
				value={password}
				onChange={({target}) => handlePasswordChange(target.value)}
				/>
			</div>
			
			<button type='submit'> login </button>
		</form>
	)	
}

LoginForm.propTypes = {
	handleSubmit: PropTypes.func.isRequired,
	handleUsernameChange: PropTypes.func.isRequired,
	handlePasswordChange: PropTypes.func.isRequired,
	username: PropTypes.string.isRequired,
	password: PropTypes.string.isRequired,
}

export default LoginForm