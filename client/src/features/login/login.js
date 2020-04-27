import React from 'react';
import { withRouter } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { useDispatch } from 'react-redux';
import { loggingIn } from './loginSlice';
import styled, { css } from 'styled-components';

import SubmitButton from '../../components/Button';
import { Form, Input, Checkbox } from 'antd';

const LoginForm = styled(Form)`
  /* display: flex;
  flex-direction: column;
  justify-content: center; */
  width: 400px;
`

const StyledInput = styled(Input)`
  background-color: ${props => props.theme.colors.background.light};
  border-radius: 0px;
  margin-top: 10px;
  
  ${({ login }) =>
    login && css`
      width: 400px;
      height: 32px;
      font-size: ${props => props.theme.fonts.caption};
      line-height: 24px;
      color: ${props => props.theme.colors.text.dark};
      border: 0px;
      border-bottom: 2px solid ${props => props.theme.colors.link.quartary};
  `}
`

function Login(props) {
  const dispatch = useDispatch();
  // const loginStatus = useSelector(
  //   (state) => state.login.loggedIn,
  // );

  const [cookies, setCookie] = useCookies(['authToken']);

  async function handleSubmit(formData) {

    let result = await fetch('http://localhost:5000/user/login', {
      method: "POST",
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({
        email: formData.email,
        password: formData.password
      })
    });

    result = await result.json();

    if (result.success) {
      const authToken = result.success.token;
      dispatch(loggingIn());
      setCookie('authToken', authToken, { path: '/' });
      props.history.push('/dashboard');
    }
  }


  return (
    <LoginForm
      name="normal_login"
      className="login-form"
      initialValues={{ remember: true }}
      onFinish={handleSubmit}
    >
      <Form.Item
        name="email"
        rules={[{ required: true, message: 'Please insert your email!' }]}
      >
        <StyledInput
          login
          type="email"
          placeholder="email"
        />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[{ required: true, message: 'Please insert your Password!' }]}
      >
        <StyledInput
          login
          type="password"
          placeholder="Password"
        />
      </Form.Item>
      <Form.Item>
        <Form.Item name="remember" valuePropName="checked" noStyle>
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <a className="login-form-forgot" href="">
          Forgot password
        </a>
      </Form.Item>

      <Form.Item>
        <SubmitButton login htmlType="submit" className="login-form-button">
          Log in
        </SubmitButton>
      </Form.Item>
    </LoginForm>
  );
}

export default withRouter(Login);
