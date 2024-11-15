import { createStyles } from "antd-style";

const useStyles = createStyles((theme) => ({
  "input-container": {
    minWidth: "32ch",
  },
  "no-item-container": {
    padding: "1em",
    backgroundColor: "#FAFAFA",
    border: "1px solid #D9D9D9",
    borderRadius: theme.token.borderRadius,
  },
}));

export default useStyles;
