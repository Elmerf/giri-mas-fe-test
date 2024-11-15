import { useAuth } from "@/hooks";
import { Flex, Layout } from "antd";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { PageContent, PageHeader, PageLocation } from "./components";
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
    <Layout className={styles["layout-container"]}>
      <Layout.Header className={styles["header-container"]}>
        <PageHeader />
      </Layout.Header>
      <Layout.Content className={styles["content-container"]}>
        <Flex vertical flex={1}>
          <PageLocation />
          <PageContent />
        </Flex>
      </Layout.Content>
    </Layout>
  );
};

export default StockMovement;
