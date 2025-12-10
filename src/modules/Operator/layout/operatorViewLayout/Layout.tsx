import React from "react";
import { Outlet } from "react-router-dom";
import styles from "./Layout.module.scss";

const Layout: React.FC<{}> = (): JSX.Element => {
  return (
    <div className={styles.container}>
      <Outlet />
    </div>
  );
};

export default Layout;
