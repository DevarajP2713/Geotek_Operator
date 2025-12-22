/* eslint-disable @typescript-eslint/no-floating-promises */
import React, { useEffect, useMemo, useState } from "react";
import styles from "./Techniques.module.scss";
import CustomTextInput from "../../../../shared/components/common/customInputFields/CustomTextInput/CustomTextInput";
import { useNavigate, useParams } from "react-router-dom";
import { projectsConstants } from "../../entities/constants";
import { ISearchObject, ITechniquesObject } from "../../entities/types";
import useTechnique from "../../hooks/useTechnique";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { Skeleton } from "antd";
import { handleMessages } from "../../../../shared/utils/UserManagementUtils";

const Techniques = (): JSX.Element => {
  const navigate = useNavigate();
  const { project_id, shift_id, shift_type } = useParams();
  const { masterData, requestStatus, refetch } = useTechnique();

  const [searchData, setSearchData] = useState<ISearchObject>({
    ...projectsConstants.ProjectSearchData,
  });

  const projectId = Number(project_id);

  useEffect(() => {
    if (projectId) {
      refetch(projectId);
    }
  }, [projectId, refetch]);

  useEffect(() => {
    handleMessages(requestStatus);
  }, [requestStatus]);

  const filteredTechniques = useMemo<ITechniquesObject[]>(() => {
    if (!searchData.Search) return masterData;

    const searchText = searchData.Search.toLowerCase();

    return masterData.filter((technique) =>
      technique?.TechniqueName?.toLowerCase().includes(searchText)
    );
  }, [masterData, searchData.Search]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setSearchData({ Search: e.target.value });
  };

  const handleBack = (): void => {
    navigate(`/projects/${project_id}/shift`);
  };

  const handleTechniqueClick = (id: number): void => {
    if (!id) return;

    navigate(
      `/projects/${project_id}/shift/${shift_id}/${shift_type}/techniques/${id}`
    );
  };

  return (
    <div className={styles.con}>
      <div className={styles.header}>
        <div className={styles.headerLeftBox}>
          <KeyboardBackspaceIcon
            style={{ cursor: "pointer" }}
            onClick={handleBack}
          />
          <h1 className={styles.title}>Choose the Technique</h1>
        </div>

        <div className="filterInp">
          <CustomTextInput
            placeholder="Search Technique"
            disabled={requestStatus?.dataFetching}
            value={searchData.Search}
            onChange={handleSearchChange}
          />
        </div>
      </div>

      <div className={filteredTechniques.length ? styles.body : styles.noBody}>
        {requestStatus?.dataFetching ? (
          <div className={styles.bodyCon}>
            {Array.from({ length: 3 }).map((_, index) => (
              <div key={index} className={styles.projectBox}>
                <Skeleton active title={{ width: "80%" }} paragraph={false} />
              </div>
            ))}
          </div>
        ) : filteredTechniques.length ? (
          <div className={styles.bodyCon}>
            {filteredTechniques.map((technique) => (
              <div
                key={technique.ID}
                className={styles.projectBox}
                title={technique.TechniqueName ?? ""}
                onClick={() => handleTechniqueClick(Number(technique.ID))}
              >
                <h2 className={styles.projectValue}>
                  {technique.TechniqueName ?? ""}
                </h2>
              </div>
            ))}
          </div>
        ) : (
          <p className={styles.noData}>No Technique</p>
        )}
      </div>
    </div>
  );
};

export default Techniques;
