import { useAuth } from "@/hooks";
import { Layout } from "antd";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { PageHeader } from "./components";
import useStyles from "./styles";

const StockMovement: React.FC = () => {
  const navigate = useNavigate();
  const { styles } = useStyles();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (!isAuthenticated()) {
      navigate("/login", { replace: true });
    }
  }, []);

  return (
    <Layout>
      <Layout.Header className={styles["header-container"]}>
        <PageHeader />
      </Layout.Header>
      <Layout.Content></Layout.Content>
    </Layout>
  );
};

export default StockMovement;
