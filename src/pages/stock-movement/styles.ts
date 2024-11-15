import { createStyles } from "antd-style";

const useStyles = createStyles((theme) => ({
  "layout-container": {
    minHeight: "100dvh",
  },
  "header-container": {
    backgroundColor: theme.token.colorWhite,
    boxShadow: theme.token.boxShadowTertiary,
    zIndex: 1,
  },
  "content-container": {
    display: "flex",
    flex: 1,
  },
}));

export default useStyles;
