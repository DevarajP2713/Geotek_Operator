/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable prefer-const */
/* eslint-disable no-unused-expressions */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import styles from "./Techniques.module.scss";
import CustomTextInput from "../../../../shared/components/common/customInputFields/CustomTextInput/CustomTextInput";
import { useNavigate, useParams } from "react-router-dom";
import { projectsConstants } from "../../entities/constants";
import { ISearchObject, ITechniquesObject } from "../../entities/types";
import useTechnique from "../../hooks/useTechnique";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";

/* Global varaiable creation start */
let localSearchData: ISearchObject = projectsConstants.TechniqueSearchData;

const Techniques = (): JSX.Element => {
  /* local varaiables creation start */
  const navigate = useNavigate();
  const { masterData, requestStatus, refetch } = useTechnique();
  const { project_id, shift_id, shift_type } = useParams();

  // States
  const [masTechniquesData, setMasTechniquesData] = useState<
    ITechniquesObject[]
  >([]);
  const [searchData, setSearchData] = useState<ISearchObject>({
    ...projectsConstants.ProjectSearchData,
  });

  const handleSearch = (): void => {
    let _filterData: ITechniquesObject[] = [...masterData];

    if (localSearchData.Search) {
      _filterData =
        _filterData?.filter((val: ITechniquesObject) =>
          val?.TechniqueName?.toLocaleLowerCase()?.includes(
            localSearchData?.Search?.toLocaleLowerCase()
          )
        ) || [];
    }

    setMasTechniquesData([..._filterData]);
  };

  useEffect(() => {
    refetch(Number(project_id));
  }, []);

  useEffect(() => {
    setMasTechniquesData(masterData);
  }, [requestStatus]);

  return (
    <div className={styles.con}>
      <div className={styles.header}>
        <div className={styles.headerLeftBox}>
          <KeyboardBackspaceIcon
            style={{ cursor: "pointer" }}
            onClick={() => navigate(`/projects/${project_id}/shift`)}
          />
          <h1 className={styles.title}>Choose the Technique</h1>
        </div>
        <div className="filterInp">
          <CustomTextInput
            placeholder="Search Technique"
            disabled={requestStatus?.dataFetching}
            value={searchData.Search}
            onChange={(e: any) => {
              localSearchData.Search = e.target.value;
              setSearchData((prev: ISearchObject) => ({
                ...prev,
                Search: e.target.value,
              }));
              handleSearch();
            }}
          />
        </div>
      </div>
      <div
        className={`${masTechniquesData?.length ? styles.body : styles.noBody}`}
      >
        {masTechniquesData?.length ? (
          <div className={styles.bodyCon}>
            {masTechniquesData?.map(
              (value: ITechniquesObject, index: number) => {
                return (
                  <div
                    key={index}
                    className={styles.projectBox}
                    title={value?.TechniqueName ?? ""}
                    onClick={() => {
                      navigate(
                        `/projects/${project_id}/shift/${shift_id}/${shift_type}/techniques/${value?.ID}`
                      );
                    }}
                  >
                    <h2 className={styles.projectValue}>
                      {value?.TechniqueName ?? ""}
                    </h2>
                  </div>
                );
              }
            )}
          </div>
        ) : (
          <p className={styles.noData}>No Techniques</p>
        )}
      </div>
    </div>
  );
};

export default Techniques;
