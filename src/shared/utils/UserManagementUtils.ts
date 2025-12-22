/* eslint-disable complexity */
/* eslint-disable dot-notation */
/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @rushstack/no-new-null */
import moment from "moment";
import dayjs from "dayjs";
import { useMemo } from "react";
import { message } from "antd";
/* eslint-disable @typescript-eslint/no-explicit-any */

export const cleanObjectData = (
  data: Record<string, any>
): Record<string, any> => {
  return Object.fromEntries(
    Object.entries(data).map(([key, value]) => [
      key,
      typeof value === "string" ? value.replace(/\s+/g, " ").trim() : value,
    ])
  );
};

export const sanitizeFormData = (data: any): any => {
  return {
    FirstName: data?.FirstName || "",
    LastName: data?.LastName || "",
    AZDisplayName: data?.AZDisplayName || "",
    JobTitle: data?.JobTitle || "",
    Department: data?.Department || "",
    DateOfJoining: data?.DateOfJoining || "",
    Address: data?.Address || "",
    City: data?.City || "",
    State: data?.State || "",
    PostalCode: data?.PostalCode || "",
    Country: data?.Country,
    License: data?.License || "",
    LicenseName: data?.LicenseName || "",
    IsActiveUser:
      data?.IsActiveUser === true || data?.IsActiveUser === "Active"
        ? "Active"
        : "Inactive",
  };
};

export const formatDateForGraphAPI = (dateString: string): string => {
  if (!dateString) return ""; // Return empty if no date is provided

  return moment(dateString, ["YYYY-MM-DD", "MM/DD/YYYY", "MM-DD-YYYY"]).format(
    "MM-DD-YYYY"
  ); // Ensures ISO 8601 date format
};

export const generateRandomPassword = (length = 8): string => {
  const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const lowercase = "abcdefghijklmnopqrstuvwxyz";
  const numbers = "0123456789";
  const specialChars = "@#$%^&*()_+";

  const allChars = uppercase + lowercase + numbers + specialChars;
  let password = "";

  // Ensure at least one character from each category
  password += uppercase[Math.floor(Math.random() * uppercase.length)];
  password += uppercase[Math.floor(Math.random() * uppercase.length)];
  password += numbers[Math.floor(Math.random() * numbers.length)];
  password += lowercase[Math.floor(Math.random() * lowercase.length)];
  password += specialChars[Math.floor(Math.random() * specialChars.length)];
  password += lowercase[Math.floor(Math.random() * lowercase.length)];

  // Fill the remaining length with random characters
  for (let i = password.length; i < length; i++) {
    password += allChars[Math.floor(Math.random() * allChars.length)];
  }

  // Shuffle the password to randomize order
  return password
    .split("")
    .sort(() => 0.5 - Math.random())
    .join("");
};

export const generateUsername = (
  firstName: string,
  lastName: string,
  userNamesData: string[]
): string => {
  // Convert names to lowercase and trim spaces
  const fnamePart = firstName.trim().toUpperCase();
  const lnamePart = lastName.trim().toUpperCase();

  // Base username without numbers
  const baseUsername = `${fnamePart.charAt(0)}${
    lnamePart.charAt(0).toUpperCase() + lnamePart.slice(1).toLowerCase()
  }`;

  // Find all existing usernames that start with baseUsername
  const matchingUsernames = userNamesData
    ?.filter((name) => name?.startsWith(baseUsername))
    ?.map((name) => name?.replace(baseUsername, "")) // Remove base part
    ?.filter((suffix) => /^\d*$/?.test(suffix)) // Keep only numeric suffixes
    ?.map(Number) // Convert to numbers
    ?.filter((num) => !isNaN(num)); // Remove NaN values

  // Determine the next available number
  const nextNumber =
    matchingUsernames.length > 0 ? Math.max(...matchingUsernames) + 1 : 1;

  // If baseUsername is unique, return it, else append the next number
  // const exitUserName = userNamesData.includes(baseUsername)
  //   ? `${baseUsername}${nextNumber}`
  //   : baseUsername;
  // console.log("exitUserName: ", exitUserName);
  return userNamesData.includes(baseUsername)
    ? `${baseUsername}${nextNumber}`
    : baseUsername;
};

const useUserStats = (UsersList_Main: any): any => {
  // Get current and previous month
  const currentMonth = dayjs().format("YYYY-MM");
  const previousMonth = dayjs().subtract(1, "month").format("YYYY-MM");

  // Calculate stats
  const activeUsers =
    UsersList_Main?.filter((user: any) => user.IsActiveUser)?.length || 0;
  const projectManagers =
    UsersList_Main?.filter(
      (user: any) => user?.JobTitle === "Project Manager" && user.IsActiveUser
    )?.length || 0;
  const allUsers = UsersList_Main?.length || 0;

  const licensesBasic =
    UsersList_Main?.filter((user: any) => user.License === "Basic")?.length ||
    0;
  const licensesStandard =
    UsersList_Main?.filter((user: any) => user.License === "Standard")
      ?.length || 0;

  // Count users created in the current and previous month
  const usersCreatedThisMonth =
    UsersList_Main?.filter(
      (user: any) => dayjs(user.Created).format("YYYY-MM") === currentMonth
    )?.length || 0;
  const usersCreatedLastMonth =
    UsersList_Main?.filter(
      (user: any) => dayjs(user.Created).format("YYYY-MM") === previousMonth
    )?.length || 0;

  let userGrowth =
    usersCreatedLastMonth === 0
      ? usersCreatedThisMonth * 100
      : ((usersCreatedThisMonth - usersCreatedLastMonth) /
          usersCreatedLastMonth) *
        100;

  // Allow negative growth but cap max at 100%
  userGrowth = Math.min(userGrowth, 100);

  return {
    activeUsers,
    projectManagers,
    allUsers,
    licensesBasic,
    licensesStandard,
    usersCreatedThisMonth,
    usersCreatedLastMonth,
    userGrowth: userGrowth.toFixed(1),
  };
};

export default useUserStats;

export const useRecentUsers = (sourceData: any): any => {
  const recentUsers = useMemo(() => {
    const sevenDaysAgo = dayjs().subtract(7, "days");

    return (sourceData || [])
      .filter((user: any) => dayjs(user.Created).isAfter(sevenDaysAgo))
      .sort((a: any, b: any) => dayjs(b.Created).diff(dayjs(a.Created)))
      .slice(0, 5)
      .map((user: any, index: number) => ({
        ...user,
        ID: index + 1, // add loop index here
      }));
  }, [sourceData]);

  return recentUsers;
};

export const cleanString = (str: string): string => {
  return str.replace(/\s+/g, " ").trim();
};

export const cleanArrayData = (data: any[]): any[] => {
  return data.map((obj) =>
    Object.fromEntries(
      Object.entries(obj).map(([key, value]) => [
        key,
        typeof value === "string" ? value.replace(/\s+/g, " ").trim() : value,
      ])
    )
  );
};
export const removeSpecialCharsWithSpaces = (str: string): string => {
  return str.replace(/[^a-zA-Z0-9\s]/g, ""); // Removes special characters but keeps spaces
};
export const getModifiedDate = (newDate: any, oldDate: any): Date | null => {
  if (!newDate) return null;

  const formattedNewDate = moment(
    newDate,
    ["YYYY-MM-DD", "MM-DD-YYYY", moment.ISO_8601],
    true
  );
  const formattedOldDate = moment(
    oldDate,
    ["YYYY-MM-DD", "MM-DD-YYYY", moment.ISO_8601],
    true
  );

  if (!formattedNewDate.isValid()) return null;

  // Compare as formatted strings to prevent unnecessary updates
  return formattedNewDate.format("YYYY-MM-DD") !==
    formattedOldDate.format("YYYY-MM-DD")
    ? formattedNewDate.toDate() // Return Date object
    : null;
};

export const handleCopy = async (
  userData: any,
  copiedSetState: any
): Promise<void> => {
  console.log("userData: ", userData);
  if (!userData) return;
  const userDetails = `User details\nFirst Name: ${
    userData?.FirstName
  }\nLast Name: ${userData?.LastName}\nDisplay Name: ${
    userData?.AZDisplayName
  }\nEmail: ${`${userData?.Email || "-"}`}\nJob Title: ${
    userData?.JobTitle
  }\nPassword: ${userData?.Password || "-"}\nDepartment: ${
    userData?.Department || "-"
  }\nLicense: ${userData?.LicenseName || "-"}`;
  await navigator.clipboard.writeText(userDetails);
  copiedSetState(true);
  await message.success("Copied to clipboard!");
  setTimeout(() => copiedSetState(false), 2000);
};
// \nPassword: ${
//     userData?.Password
//   }
// meassage handler

let loadingTimeout: any | null = null;

export const handleMessages = async (requestStatus: any): Promise<void> => {
  const loaderID = "loadermsg";

  // Clear previous timeout if any
  if (loadingTimeout) {
    clearTimeout(loadingTimeout);
    loadingTimeout = null;
  }

  // Show loading
  if (requestStatus?.dataFetching && !requestStatus?.promiseResolved) {
    message.loading({
      content: requestStatus?.message || "Processing request...",
      key: loaderID,
      duration: 0, // stays until manually closed
    });

    // If still loading after 5s, update the message
    loadingTimeout = setTimeout(() => {
      message.open({
        type: "loading",
        content: "Almost there... hang tight!",
        key: loaderID,
        duration: 0,
      });
    }, 5000);
    return;
  }

  // Show success
  if (!requestStatus?.dataFetching && requestStatus?.promiseResolved) {
    message.success({
      content: requestStatus?.message || "Success!",
      key: loaderID,
      duration: 2,
    });
    return;
  }

  // Show error
  if (
    !requestStatus?.dataFetching &&
    requestStatus?.promiseResolved === false &&
    (requestStatus?.errorCode || requestStatus?.errorName)
  ) {
    message.error({
      content:
        requestStatus?.message ||
        `Something went wrong: ${requestStatus?.errorName || "Error"}`,
      key: loaderID,
      duration: 3,
    });
  }
};

// validation part
// utils/formUtils.ts

export type FormError = {
  [key: string]: {
    isValid: boolean;
    message: string;
  };
};

export const handleGenericChange = <T extends object>(
  key: keyof T,
  value: any,
  setFormData: React.Dispatch<React.SetStateAction<T>>,
  setErrors: React.Dispatch<React.SetStateAction<FormError>>
): void => {
  setFormData((prev) => ({ ...prev, [key]: value }));

  const checkTrueValue =
    typeof value === "string" ? !!value && value.trim() !== "" : !!value;

  if (
    key !== "City" &&
    key !== "State" &&
    key !== "PostalCode" &&
    key !== "Country"
  ) {
    setErrors((prev) => ({
      ...prev,
      [key]: {
        isValid: checkTrueValue,
        message: checkTrueValue
          ? // ? ""
            // : key === "PostalCode"
            "enter a valid postal code"
          : key === "IsActiveUser"
          ? "account status is required"
          : `${
              key === "AZDisplayName"
                ? "display name"
                : String(key)
                    .replace(/([A-Z])/g, " $1")
                    .toLowerCase()
            } is required`,
      },
    }));
  }
};

export const handleUserNameChange = <T extends object>(
  key: keyof T,
  value: string,
  overAllUserNames: string[],
  setFormData: React.Dispatch<React.SetStateAction<T>>,
  setErrors: React.Dispatch<React.SetStateAction<FormError>>
): void => {
  const sanitizedUserName = value.replace(/\s+/g, "");
  const isDuplicate = overAllUserNames?.includes(value.toLowerCase().trim());
  const checkTrueValue = !!value && value.trim() !== "" && !isDuplicate;

  setFormData((prev) => ({ ...prev, [key]: sanitizedUserName }));

  setErrors((prev) => ({
    ...prev,
    [key]: {
      isValid: checkTrueValue,
      message: checkTrueValue
        ? ""
        : isDuplicate
        ? "user name already exist."
        : `${String(key)
            .replace(/([A-Z])/g, " $1")
            .toLowerCase()} is required`,
    },
  }));
};
