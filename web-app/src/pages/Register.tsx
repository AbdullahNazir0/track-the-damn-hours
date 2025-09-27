import { Typography, message, Button, Form, Input, type FormProps, Divider } from "antd";
import { showErrorMessage, showLoadingMessage, showSuccessMessage } from "../utils/messages";
import { register } from "../api/auth";
import { parseError } from "../utils/error";
import { GithubOutlined, GoogleOutlined } from "@ant-design/icons";

const { Title } = Typography;

type FieldType = {
    name: string;
	email: string;
	password: string;
};

export default function Register() {
	const [messageApi, contextHolder] = message.useMessage();
	const key = "loading";

	 const [form] = Form.useForm<FieldType>();

	const onFinish: FormProps<FieldType>["onFinish"] = async values => {
		try {
            showLoadingMessage(messageApi, key, "Registering...");

			await register(values);
			
			form.resetFields();

            showSuccessMessage(messageApi, key, "Registered Successfully");
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
				form={form}
				name="registerForm"
				layout="vertical"
				style={{ width: 400, padding: "40px" }}
				className="border rounded-lg shadow-lg bg-blue-50"
				initialValues={{ remember: true }}
				onFinish={onFinish}
				onFinishFailed={onFinishFailed}
                autoComplete="off">
                <Title className="text-center" level={2}>Register</Title>

                <Form.Item<FieldType>
					label="Name"
					name="name"
					rules={[
						{ required: true, message: "Please input your name!" },
					]}>
					<Input placeholder="user name" />
				</Form.Item>

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
