import { createStyles } from "antd-style";

const useStyles = createStyles((theme) => ({
  "login-container": {
    minWidth: "100dvw",
    minHeight: "100dvh",
  },
  "card-container": {
    boxShadow: theme.token.boxShadow,
    borderRadius: theme.token.borderRadius,
  },
  "disclaimer-container": {
    position: "absolute",
    bottom: 0,
    right: 0,
    fontSize: "0.75em",
    opacity: 0.3,
  },
}));

export default useStyles;
