import { Breadcrumb } from "antd";

type BreadcrumbListProps = {
  list: string[];
};

// deprecated
const BreadcrumbList: React.FC<BreadcrumbListProps> = (props) => {
  return (
    <Breadcrumb>
      {props.list.map((item) => (
        <Breadcrumb.Item>{item}</Breadcrumb.Item>
      ))}
    </Breadcrumb>
  );
};

export default BreadcrumbList;
