/* eslint-disable no-unused-expressions */
/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import CustomTextInput from "../../../../shared/components/common/customInputFields/CustomTextInput/CustomTextInput";
import { useNavigate } from "react-router-dom";
import useProjects from "../../hooks/useProjects";
import { ISearchObject, IProjectsObject } from "../../entities/types";
import { projectsConstants } from "../../entities/constants";
import styles from "./Projects.module.scss";

/* Global varaiable creation start */
let localSearchData: ISearchObject =
  projectsConstants.ProjectSearchData;

const Projects = (): JSX.Element => {
  /* local varaiables creation start */
  const navigate = useNavigate();
  const { masterData, requestStatus, refetch } = useProjects();

  // States
  const [masprojectsData, setMasprojectsData] = useState<IProjectsObject[]>([]);
  const [searchData, setSearchData] = useState<ISearchObject>({
    ...projectsConstants.ProjectSearchData,
  });

  const handleSearch = async (): Promise<void> => {
    let _filterData: IProjectsObject[] = [...masterData];

    if (localSearchData.Search) {
      _filterData =
        _filterData?.filter((val: IProjectsObject) =>
          val?.Title?.toLocaleLowerCase()?.includes(
            localSearchData?.Search?.toLocaleLowerCase()
          )
        ) || [];
    }

    setMasprojectsData([..._filterData]);
  };

  useEffect(() => {
    refetch();
  }, []);

  useEffect(() => {
    setMasprojectsData(masterData);
  }, [requestStatus]);

  return (
    <div className={styles.operatorCon}>
      <div className={styles.header}>
        <h1 className={styles.title}>Choose a Project</h1>
        <div className="filterInp">
          <CustomTextInput
            placeholder="Search Project"
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
        className={`${masprojectsData?.length ? styles.body : styles.noBody}`}
      >
        {masprojectsData?.length ? (
          <div className={styles.bodyCon}>
            {masprojectsData?.map((value: IProjectsObject, index: number) => {
              return (
                <div
                  key={index}
                  className={styles.projectBox}
                  title={value?.Title ?? ""}
                  onClick={() => {
                    navigate(`/projects/${value?.ID}/shift`);
                  }}
                >
                  <h2 className={styles.projectValue}>{value?.Title ?? ""}</h2>
                </div>
              );
            })}
          </div>
        ) : (
          <p className={styles.noData}>No Projects</p>
        )}
      </div>
    </div>
  );
};

export default Projects;
