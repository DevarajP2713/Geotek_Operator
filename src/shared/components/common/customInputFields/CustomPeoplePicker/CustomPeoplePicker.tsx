/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable complexity */
/* eslint-disable no-unused-expressions */
/* eslint-disable @typescript-eslint/no-explicit-any */

import React, { useEffect, useState } from "react";
import {
  PeoplePicker,
  PrincipalType,
} from "@pnp/spfx-controls-react/lib/PeoplePicker";
import styles from "./peoplePicker.module.scss";
import { useSelector } from "react-redux";
import { constants } from "../../../../../config/constants";

const CustomPeoplePicker: React.FC<any> = ({
  onChange,
  placeholder = "choose user",
  personSelectionLimit,
  selectedItem,
  size,
  withLabel,
  Label,
  disabled,
  isValid,
  errorMsg,
  readOnly,
  noErrorMsg = false,
  mandatory,
  multiUsers = false,
  groupName,
  isRequired = false,
  resultFilter,
}) => {
  const [isFocused, setIsFocused] = useState(false);

  // This context is stored in Redux only for PeoplePicker UI
  const mainContext: any = useSelector(
    (state: any) => state.MainSPContext.value
  );

  const selectedUserItem = selectedItem
    ? selectedItem.filter((item: any) => item)
    : [];

  //🔹 Fetch Job Title from Microsoft Graph
  const getJobTitle = async (email: string) => {
    if (!mainContext || !mainContext.msGraphClientFactory) {
      console.error(
        "MSGraphClientFactory missing. Check context passed to component."
      );
      return null;
    }

    try {
      const graphClient = await mainContext.msGraphClientFactory.getClient("3");

      const user = await graphClient
        .api(`/users/${email}`)
        .select("displayName,jobTitle,department,officeLocation")
        .get();

      return user.jobTitle || null;
    } catch (error) {
      console.error("Error fetching job title:", error);
      return null;
    }
  };

  //🔹 Handle PeoplePicker Change
  const handleChange = async (items: any[]): Promise<void> => {
    const mapped = [];

    for (const item of items) {
      const email = item.secondaryText;
      const jobTitle = await getJobTitle(email);

      mapped.push({
        id: item.id,
        name: item.text,
        email,
        jobTitle,
      });
    }

    onChange && onChange(mapped);
  };

  // Selected User Emails
  const selectedUserEmails =
    selectedUserItem?.map((item: any) => item?.email || item) || [];

  useEffect(() => {
    if (selectedUserItem?.length) {
      setIsFocused(true);
    }
  }, [selectedItem, isFocused]);

  return (
    <div
      className={styles.inputMainWrapper}
      style={{
        marginBottom: !noErrorMsg && !isValid ? "0" : "0",
      }}
    >
      <div
        className={`${styles.pickerWrapper} ${
          disabled ? styles.disabledInput : ""
        } ${
          !noErrorMsg && isValid !== undefined && !isValid
            ? styles.errorWrapper
            : ""
        }`}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      >
        <label className="inputLabels">
          {Label}
          {isRequired && <span className="requiredIcon">*</span>}
        </label>

        <PeoplePicker
          key={
            selectedUserEmails.length > 0
              ? selectedUserEmails.join("|")
              : "empty"
          }
          context={mainContext}
          webAbsoluteUrl={constants.TenantDetail.webURL}
          personSelectionLimit={personSelectionLimit}
          showtooltip={false}
          placeholder={placeholder}
          ensureUser={true}
          onChange={handleChange}
          styles={{
            root: {
              minWidth: "100%",
              maxWidth: "100%",
            },
            text: {
              border: "0 !important",
              outline: "0 !important",
            },
          }}
          groupName={groupName ?? null}
          principalTypes={[PrincipalType.User]}
          defaultSelectedUsers={selectedUserEmails}
          disabled={disabled}
          resultFilter={resultFilter}
        />
      </div>

      {!noErrorMsg && isValid !== undefined && !isValid && (
        <span className={styles.errorMsg}>{errorMsg}</span>
      )}
    </div>
  );
};

export default CustomPeoplePicker;
