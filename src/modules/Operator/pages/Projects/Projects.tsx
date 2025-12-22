/* eslint-disable @typescript-eslint/no-floating-promises */
import React, { useEffect, useMemo, useState } from "react";
import CustomTextInput from "../../../../shared/components/common/customInputFields/CustomTextInput/CustomTextInput";
import { useNavigate } from "react-router-dom";
import useProjects from "../../hooks/useProjects";
import { ISearchObject, IProjectsObject } from "../../entities/types";
import { projectsConstants } from "../../entities/constants";
import styles from "./Projects.module.scss";
import { Skeleton } from "antd";
import { handleMessages } from "../../../../shared/utils/UserManagementUtils";

const Projects = (): JSX.Element => {
  const navigate = useNavigate();
  const { masterData, requestStatus, refetch } = useProjects();

  const [searchData, setSearchData] = useState<ISearchObject>({
    ...projectsConstants.ProjectSearchData,
  });

  useEffect(() => {
    refetch();
  }, [refetch]);

  useEffect(() => {
    handleMessages(requestStatus);
  }, [requestStatus]);

  const filteredProjects = useMemo<IProjectsObject[]>(() => {
    if (!searchData.Search) return masterData;

    const searchText = searchData.Search.toLowerCase();

    return masterData.filter(
      (project) =>
        project?.Title?.toLowerCase().includes(searchText) ||
        project?.Name?.toLowerCase().includes(searchText)
    );
  }, [masterData, searchData.Search]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setSearchData({ Search: e.target.value });
  };

  const handleProjectClick = (id: number): void => {
    if (!id) return;
    navigate(`/projects/${id}/shift`);
  };

  return (
    <div className={styles.operatorCon}>
      <div className={styles.header}>
        <h1 className={styles.title}>Choose a Project</h1>

        <div className="filterInp">
          <CustomTextInput
            placeholder="Search Project"
            disabled={requestStatus?.dataFetching}
            value={searchData.Search}
            onChange={handleSearchChange}
          />
        </div>
      </div>

      <div className={filteredProjects.length ? styles.body : styles.noBody}>
        {requestStatus?.dataFetching ? (
          <div className={styles.bodyCon}>
            {Array.from({ length: 6 }).map((_, index) => (
              <div key={index} className={styles.projectBox}>
                <Skeleton active title={{ width: "80%" }} paragraph={false} />
              </div>
            ))}
          </div>
        ) : filteredProjects.length ? (
          <div className={styles.bodyCon}>
            {filteredProjects.map((project) => (
              <div
                key={project.ID}
                className={styles.projectBox}
                onClick={() => handleProjectClick(Number(project.ID))}
              >
                <h2
                  className={styles.projectNumber}
                  title={project.Title ?? ""}
                >
                  {project.Title ?? ""}
                </h2>
                <h2 className={styles.projectName} title={project.Name ?? ""}>
                  {project.Name ?? ""}
                </h2>
              </div>
            ))}
          </div>
        ) : (
          <p className={styles.noData}>No Project</p>
        )}
      </div>
    </div>
  );
};

export default Projects;
