import { Button, Flex, Result } from "antd";
import useStyles from "./styles";
import { useNavigate } from "react-router-dom";

const NotFound: React.FC = () => {
  const { styles } = useStyles();

  const navigate = useNavigate();

  const handleNavigationBack = () => {
    navigate(-1);
  };

  return (
    <Flex
      align="center"
      justify="center"
      className={styles["not-found-container"]}
    >
      <Result
        status="404"
        title="404"
        subTitle="Sorry, the page you visited does not exist."
        extra={
          <Button type="primary" onClick={handleNavigationBack}>
            Kembali ke Sebelumnya
          </Button>
        }
      />
    </Flex>
  );
};

export default NotFound;
