import { CompanyLogo } from "@/assets";
import { LOCAL_STORAGE_KEYS } from "@/constant";
import { useLocalStorage } from "@/hooks";
import { Card, Flex, Image, Space } from "antd";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { LoginForm } from "./components";
import useStyles from "./styles";

const Login: React.FC = () => {
  const navigate = useNavigate();

  const { styles } = useStyles();

  const { retrieveItem } = useLocalStorage();

  useEffect(() => {
    const dataUser = retrieveItem(LOCAL_STORAGE_KEYS.USER);

    if (dataUser) {
      navigate("/stock-movement", { replace: true });
    }
  }, []);

  return (
    <Flex align="center" justify="center" className={styles["login-container"]}>
      <Card className={styles["card-container"]}>
        <Flex gap={"0.5em"} align="center" vertical>
          <Image
            src={CompanyLogo}
            width={"24em"}
            alt="Company Logo"
            preview={false}
          />
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
