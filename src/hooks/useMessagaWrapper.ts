import { message } from "antd";

const useMessageWrapper = () => {
  const [messageApi, contextHolder] = message.useMessage();

  return {
    messageApi,
    contextHolder,
  };
};

export default useMessageWrapper;
