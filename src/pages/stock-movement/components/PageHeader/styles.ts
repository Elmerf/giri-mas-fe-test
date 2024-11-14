import { createStyles, css } from "antd-style";

const useStyles = createStyles(() => ({
  "tools-container": css`
    display: flex;
    gap: 1.25em;

    align-items: center;

    * {
      cursor: pointer;
    },
  `,
  "icon-size": {
    fontSize: "1.5em",
  },
  "user-container": {
    display: "flex",
    alignItems: "center",
    maxHeight: "2.5em",
    gap: "0.5em",
  },
}));

export default useStyles;
