import { Breadcrumb, Flex } from "antd";
import { BreadcrumbItemType } from "antd/es/breadcrumb/Breadcrumb";
import useStyles from "./styles";

const currentLocation: BreadcrumbItemType[] = [
  { title: "Stock Movement" },
  { title: "Pemindahan Barang" },
];

const PageLocation: React.FC = () => {
  const { styles } = useStyles();

  return (
    <Flex vertical className={styles["page-location-container"]} gap={"1em"}>
      <Breadcrumb items={currentLocation} />
      <h3>{currentLocation[currentLocation.length - 1]["title"]}</h3>
    </Flex>
  );
};

export default PageLocation;
