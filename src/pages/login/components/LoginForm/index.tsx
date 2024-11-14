import { LOCAL_STORAGE_KEYS } from "@/constant";
import { useAuth, useLocalStorage, useMessageWrapper } from "@/hooks";
import { Button, Form, Input } from "antd";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useStyles from "./styles";

type LoginFormFields = {
  username: string;
  password: string;
};

const LoginForm: React.FC = () => {
  const { styles } = useStyles();

  const navigate = useNavigate();

  const { authenticate } = useAuth();
  const { messageApi, contextHolder } = useMessageWrapper();
  const { setItem } = useLocalStorage();

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (values: LoginFormFields) => {
    setIsSubmitting(true);

    const { username, password } = values;

    const data = await authenticate({ username, password });

    if (data) {
      setItem(LOCAL_STORAGE_KEYS.USER, JSON.stringify(data));
      navigate("/stock-movement", { replace: true });
    } else {
      messageApi.error("username atau password salah!");
    }

    setIsSubmitting(false);
  };
  return (
    <Form<LoginFormFields>
      layout="vertical"
      className={styles["form-container"]}
      onFinish={handleSubmit}
    >
      {contextHolder}
      <Form.Item<LoginFormFields>
        label="Username"
        name="username"
        required
        rules={[{ required: true, message: "username is required" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item<LoginFormFields>
        label="Password"
        name="password"
        required
        rules={[{ required: true, message: "password is required" }]}
      >
        <Input.Password />
      </Form.Item>
      <Form.Item label={null} className={styles["submit-button-container"]}>
        <Button
          type="primary"
          htmlType="submit"
          className={styles["submit-button"]}
          loading={isSubmitting}
          iconPosition="end"
        >
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default LoginForm;
