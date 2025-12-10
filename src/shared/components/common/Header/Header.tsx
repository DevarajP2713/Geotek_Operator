/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import styles from "./Header.module.scss";
import { Avatar } from "antd";

// Interfaces
interface IProps {
  context: any;
}
const Header = (props: IProps): JSX.Element => {
  // Variables
  const GeoTekLogo: string = require("../../../../assets/png/Geo_Tek_white-full-logo.png");
  const GeoTekOperatorLogo: string = require("../../../../assets/png/Geo_Tek_Operator_logo.png");

  return (
    <div className={styles.headerCon}>
      <div className={styles.geoTekLogoBox}>
        <img src={GeoTekLogo} alt="Geo_Tek_Logo" />
      </div>
      <div className={styles.geoTekOperatorLogoBox}>
        <img src={GeoTekOperatorLogo} alt="Geo_Tek_Operator_Logo" />
      </div>
      <div className={styles.geoTekUserBox}>
        <p className={styles.userName}>
          {props?.context?._pageContext?._user?.displayName ?? ""}
        </p>
        <Avatar
          src={`/_layouts/15/userphoto.aspx?size=S&username=${
            props?.context?._pageContext?._user?.email ?? ""
          }`}
        />
      </div>
    </div>
  );
};

export default Header;
