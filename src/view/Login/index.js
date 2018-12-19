import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { Button, Card, CardBody, CardGroup, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';
import { connect } from 'react-redux'
import RA from '../../redux/actions';
import { GoogleLogin } from 'react-google-login'
import RC from '../../config';
class Login extends Component {

	onLogin = () => {
		this.props.dispatch(RA.checkAuth({ username: "truongbl", password: "123" }, this.onLoginCallback))
	}

	onLoginCallback = (res) => {
		if (res.hasError) {
			console.log("Có lỗi trong quá trình login")
			return
		}
		console.info("success login")
		this.props.history.push('/sendmail')
	}

	onLoginGGSuccess = (res) => {
		console.log("GGLogin Success", res)
		this.props.dispatch(RA.checkAuth(res))
	}

	onLoginGGError = (res) => {
		this.props.dispatch(RA.setUserFail(res))
	}
	shouldComponentUpdate = (nextProps, nextState) => {
		return true
	}
	render() {
		if (this.props.userInfo) {
			return <Redirect to="/dashboard" />
		}
		return (
			<div className="app flex-row align-items-center">
				<Container>
					<Row className="justify-content-center">
						<Col md="8">
							<CardGroup>
								<Card className="p-4">
									<CardBody>
										<Form>
											<h1>Login</h1>
											<p className="text-muted">Sign In to your account</p>
											<InputGroup className="mb-3">
												<InputGroupAddon addonType="prepend">
													<InputGroupText>
														<i className="icon-user"></i>
													</InputGroupText>
												</InputGroupAddon>
												<Input type="text" placeholder="Username" autoComplete="username" />
											</InputGroup>
											<InputGroup className="mb-4">
												<InputGroupAddon addonType="prepend">
													<InputGroupText>
														<i className="icon-lock"></i>
													</InputGroupText>
												</InputGroupAddon>
												<Input type="password" placeholder="Password" autoComplete="current-password" />
											</InputGroup>
											{
												this.props.error
													? <Row>
														<Col><div className="alert alert-danger">Có lỗi trong quá trình xác thực thông tin</div></Col>
													</Row>
													: null
											}
											<Row>
												<Col>
													<Button color="primary" className="px-4 w-100" onClick={this.onLogin}>Login</Button>
												</Col>
											</Row>
											<Row>
												<Col className="text-center">
													<Button color="link" className="px-0">Forgot password?</Button>
												</Col>
											</Row>
											<Row>
												<Col>
													<GoogleLogin
														buttonText="Sign in with Google account"
														clientId={RC.GG_CLIENT_ID}
														onSuccess={this.onLoginGGSuccess}
														onFailure={this.onLoginGGError}
														className="w-100 mt-3"
														theme="dark"
													// render={renderProps => (
													// 	<Button color="primary" onClick={renderProps.onClick}>This is my custom Google button</Button>
													//   )}
													/>
												</Col>
											</Row>
										</Form>
									</CardBody>
								</Card>
								<Card className="text-white bg-primary py-5 d-md-down-none" style={{ width: '44%' }}>
									<CardBody className="text-center">
										<div>
											<h2>Sign up</h2>
											<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
											<Link to="/register">
												<Button color="primary" className="mt-3" active tabIndex={-1}>Register Now!</Button>
											</Link>
										</div>
									</CardBody>
								</Card>
							</CardGroup>
						</Col>
					</Row>
				</Container>
			</div>
		);
	}
}

const mapStateToProps = state => {
	let { userInfo, error } = state.auth
	return { userInfo, error }
}


export default connect(mapStateToProps)(Login)
