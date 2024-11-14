import { UserAvatar } from "@/assets";
import { useAuth } from "@/hooks";
import { BellOutlined } from "@ant-design/icons";
import { Badge, Button, Flex, Image, Popover } from "antd";
import useStyles from "./styles";

const PageHeader: React.FC = () => {
  const { styles } = useStyles();

  const { signOut } = useAuth();

  const handleSignOut = () => {
    signOut();
  };

  return (
    <Flex justify="space-between">
      <h2>Stock Movement</h2>
      <div className={styles["tools-container"]}>
        <Popover
          title={"Daftar Notifikasi"}
          trigger={"click"}
          placement="bottom"
        >
          <Badge count={11} size="small">
            <BellOutlined className={styles["icon-size"]} />
          </Badge>
        </Popover>
        <Popover
          title={
            <Button
              type="primary"
              style={{ width: "100%" }}
              onClick={handleSignOut}
            >
              Sign Out
            </Button>
          }
          trigger={"click"}
          arrow={false}
          placement="bottomLeft"
        >
          <div className={styles["user-container"]}>
            <Image
              width={"2em"}
              height={"2em"}
              src={UserAvatar}
              alt="User Image"
              preview={false}
            />
            <span>User</span>
          </div>
        </Popover>
      </div>
    </Flex>
  );
};

export default PageHeader;
