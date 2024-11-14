import { createStyles } from "antd-style";

const useStyles = createStyles(() => ({
  "form-container": {
    alignSelf: "flex-start",
    minWidth: "48ch",
    maxWidth: "100%",
  },
  "submit-button-container": {
    display: "flex",
    justifyContent: "flex-end",
  },
  "submit-button": {
    width: "24ch",
  },
}));

export default useStyles;
