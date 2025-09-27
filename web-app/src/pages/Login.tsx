import {
	Typography,
	message,
	Button,
	Form,
	Input,
	type FormProps,
	Divider,
} from "antd";
import {
	showErrorMessage,
	showLoadingMessage,
	showSuccessMessage,
} from "../utils/messages";
import { login } from "../api/auth";
import { parseError } from "../utils/error";
import { GithubOutlined, GoogleOutlined } from "@ant-design/icons";

const { Title } = Typography;

type FieldType = {
	email: string;
	password: string;
};

export default function Login() {
	const [messageApi, contextHolder] = message.useMessage();
	const key = "loading";

	const onFinish: FormProps<FieldType>["onFinish"] = async values => {
		try {
			showLoadingMessage(messageApi, key, "Logging In...");

			const res = await login(values);
			localStorage.setItem("ttdh_token", res.data.token);

			showSuccessMessage(messageApi, key, "Login Successfully");
		} catch (error) {
			const { message } = parseError(error);
			showErrorMessage(messageApi, key, message);
		}
	};

	const onFinishFailed: FormProps<FieldType>["onFinishFailed"] =
		errorInfo => {
			const { message } = parseError(errorInfo);
			showErrorMessage(messageApi, key, message);
		};

	return (
		<div className="flex justify-center items-center h-screen">
			{contextHolder}
			<Form
				name="loginForm"
				layout="vertical"
				style={{ width: 400, padding: "40px" }}
				className="border rounded-lg shadow-lg bg-blue-50"
				initialValues={{ remember: true }}
				onFinish={onFinish}
				onFinishFailed={onFinishFailed}
				autoComplete="off">
				<Title
					className="text-center"
					level={2}>
					Login
				</Title>

				<Form.Item<FieldType>
					label="Email"
					name="email"
					rules={[
						{ required: true, message: "Please input your email!" },
						{
							type: "email",
							message: "Please enter a valid email!",
						},
					]}>
					<Input placeholder="user@example.com" />
				</Form.Item>

				<Form.Item<FieldType>
					label="Password"
					name="password"
					rules={[
						{
							required: true,
							message: "Please input your password!",
						},
						{
							min: 6,
							message: "Password must be at least 6 characters!",
						},
					]}>
					<Input.Password placeholder="********" />
				</Form.Item>

				<Form.Item label={null}>
					<Button
						type="primary"
						htmlType="submit">
						Submit
					</Button>
				</Form.Item>

				<Divider>OR</Divider>

				<Form.Item
					className="flex justify-center items-center"
					label={null}>
					<div className="flex space-x-6">
						<GoogleOutlined
							className="text-3xl cursor-pointer"
							onClick={() =>
								(window.location.href =
									"http://localhost:3000/auth/google")
							}
						/>
						<GithubOutlined
							className="text-3xl cursor-pointer"
							onClick={() =>
								(window.location.href =
									"http://localhost:3000/auth/github")
							}
						/>
					</div>
				</Form.Item>
			</Form>
		</div>
	);
}
