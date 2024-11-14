import { Card, Flex, Image, Space } from "antd";
import { LoginForm } from "./components";
import useStyles from "./styles";
import Logo from "@/assets/company-logo.png";

const Login: React.FC = () => {
  const { styles } = useStyles();

  return (
    <Flex align="center" justify="center" className={styles["login-container"]}>
      <Card className={styles["card-container"]}>
        <Flex gap={"0.5em"} align="center" vertical>
          <Image src={Logo} width={"24em"} alt="Company Logo" preview={false} />
          <h1>PT. Giri Mas Indah</h1>
          <h3>Masuk dengan akun Anda</h3>
          <LoginForm />
        </Flex>
      </Card>
      <Space direction="vertical" className={styles["disclaimer-container"]}>
        <span>Dibuat untuk tes teknikal FE di PT. GIRI Mas Indah</span>
        <span>oleh: Elmer Fiqi Tajusaladin</span>
      </Space>
    </Flex>
  );
};

export default Login;
