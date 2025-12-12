/* eslint-disable @typescript-eslint/no-namespace */

import { constants } from "../../../config/constants";
import { ICamlQuery } from "../../../types/Types";

export namespace TechniqueQueries {
  export const getCamlQuery = (projectId: number): ICamlQuery[] => [
    {
      ListName: constants.ListName.PM_Techniques,
      CamlQuery: `
        <View Scope='RecursiveAll'>
          <Query>
            <OrderBy>
              <FieldRef Name='Created' Ascending='FALSE'/>
            </OrderBy>
            <Where>
              <Eq>
                <FieldRef Name='Project' LookupId='TRUE'/>
                <Value Type='Lookup'>${projectId}</Value>
              </Eq>
            </Where>
          </Query>
          <ViewFields>
            <FieldRef Name='Title' />
            <FieldRef Name='LinkTitle' />
            <FieldRef Name='_ColorTag' />
            <FieldRef Name='ComplianceAssetId' />

            <FieldRef Name='Project' />
            <FieldRef Name='Technique' />
            <FieldRef Name='Equipments' />
            <FieldRef Name='Predrilling' />
            <FieldRef Name='CalibrationName' />
            <FieldRef Name='CalibrationUnit' />
            <FieldRef Name='CalibrationValue' />
            <FieldRef Name='InstallationPowerName' />
            <FieldRef Name='InstallationPowerUnit' />
            <FieldRef Name='InstallationPowerValue' />
            <FieldRef Name='TargetGeometryName' />
            <FieldRef Name='TargetGeometryUnit' />
            <FieldRef Name='TargetGeometryValue' />
            <FieldRef Name='Comments' />
            <FieldRef Name='ID' />
            
            <FieldRef Name='ContentType' />
            <FieldRef Name='Modified' />
            <FieldRef Name='Created' />
            <FieldRef Name='Author' />
            <FieldRef Name='Editor' />
            <FieldRef Name='_UIVersionString' />
            <FieldRef Name='Attachments' />
            <FieldRef Name='Edit' />
            <FieldRef Name='LinkTitleNoMenu' />
            <FieldRef Name='DocIcon' />
            <FieldRef Name='ItemChildCount' />
            <FieldRef Name='FolderChildCount' />
            <FieldRef Name='_ComplianceFlags' />
            <FieldRef Name='_ComplianceTag' />
            <FieldRef Name='_ComplianceTagWrittenTime' />
            <FieldRef Name='_ComplianceTagUserId' />
            <FieldRef Name='_IsRecord' />
            <FieldRef Name='AppAuthor' />
            <FieldRef Name='AppEditor' />
          </ViewFields>
          <RowLimit Paged='TRUE'>5000</RowLimit>
        </View>`,
    },
  ];

  export const getTechniqueCamlQuery = (TechniqueId: number): ICamlQuery[] => [
    {
      ListName: constants.ListName.PM_Techniques,
      CamlQuery: `
        <View Scope='RecursiveAll'>
          <Query>
            <OrderBy>
              <FieldRef Name='Created' Ascending='FALSE'/>
            </OrderBy>
            <Where>
              <Eq>
                <FieldRef Name='ID' LookupId='TRUE'/>
                <Value Type='Counter'>${TechniqueId}</Value>
              </Eq>
            </Where>
          </Query>
          <ViewFields>
            <FieldRef Name='Title' />
            <FieldRef Name='LinkTitle' />
            <FieldRef Name='_ColorTag' />
            <FieldRef Name='ComplianceAssetId' />

            <FieldRef Name='Project' />
            <FieldRef Name='Technique' />
            <FieldRef Name='Equipments' />
            <FieldRef Name='Predrilling' />
            <FieldRef Name='CalibrationName' />
            <FieldRef Name='CalibrationUnit' />
            <FieldRef Name='CalibrationValue' />
            <FieldRef Name='InstallationPowerName' />
            <FieldRef Name='InstallationPowerUnit' />
            <FieldRef Name='InstallationPowerValue' />
            <FieldRef Name='TargetGeometryName' />
            <FieldRef Name='TargetGeometryUnit' />
            <FieldRef Name='TargetGeometryValue' />
            <FieldRef Name='Comments' />
            <FieldRef Name='ID' />
            
            <FieldRef Name='ContentType' />
            <FieldRef Name='Modified' />
            <FieldRef Name='Created' />
            <FieldRef Name='Author' />
            <FieldRef Name='Editor' />
            <FieldRef Name='_UIVersionString' />
            <FieldRef Name='Attachments' />
            <FieldRef Name='Edit' />
            <FieldRef Name='LinkTitleNoMenu' />
            <FieldRef Name='DocIcon' />
            <FieldRef Name='ItemChildCount' />
            <FieldRef Name='FolderChildCount' />
            <FieldRef Name='_ComplianceFlags' />
            <FieldRef Name='_ComplianceTag' />
            <FieldRef Name='_ComplianceTagWrittenTime' />
            <FieldRef Name='_ComplianceTagUserId' />
            <FieldRef Name='_IsRecord' />
            <FieldRef Name='AppAuthor' />
            <FieldRef Name='AppEditor' />
          </ViewFields>
          <RowLimit Paged='TRUE'>5000</RowLimit>
        </View>`,
    },
  ];

  export const getTechniquesProjectAndTechniqueWiseCamlQuery = (
    projectId: number,
    techniqueId: number
  ): ICamlQuery[] => [
    {
      ListName: constants.ListName.PM_Techniques,
      CamlQuery: `
        <View Scope='RecursiveAll'>
          <Query>
            <OrderBy>
              <FieldRef Name='Created' Ascending='FALSE'/>
            </OrderBy>
            <Where>
                <And>
                    <Eq>
                        <FieldRef Name='Project' LookupId='TRUE'/>
                        <Value Type='Lookup'>${projectId}</Value>
                    </Eq>
                    <Eq>
                        <FieldRef Name='ID' />
                        <Value Type='Counter'>${techniqueId}</Value>
                    </Eq>
                </And>
          </Where>
          </Query>
          <ViewFields>
            <FieldRef Name='Title' />
            <FieldRef Name='LinkTitle' />
            <FieldRef Name='_ColorTag' />
            <FieldRef Name='ComplianceAssetId' />

            <FieldRef Name='Project' />
            <FieldRef Name='Technique' />
            <FieldRef Name='Equipments' />
            <FieldRef Name='Predrilling' />
            <FieldRef Name='CalibrationName' />
            <FieldRef Name='CalibrationUnit' />
            <FieldRef Name='CalibrationValue' />
            <FieldRef Name='InstallationPowerName' />
            <FieldRef Name='InstallationPowerUnit' />
            <FieldRef Name='InstallationPowerValue' />
            <FieldRef Name='TargetGeometryName' />
            <FieldRef Name='TargetGeometryUnit' />
            <FieldRef Name='TargetGeometryValue' />
            <FieldRef Name='Comments' />
            <FieldRef Name='ID' />
            
            <FieldRef Name='ContentType' />
            <FieldRef Name='Modified' />
            <FieldRef Name='Created' />
            <FieldRef Name='Author' />
            <FieldRef Name='Editor' />
            <FieldRef Name='_UIVersionString' />
            <FieldRef Name='Attachments' />
            <FieldRef Name='Edit' />
            <FieldRef Name='LinkTitleNoMenu' />
            <FieldRef Name='DocIcon' />
            <FieldRef Name='ItemChildCount' />
            <FieldRef Name='FolderChildCount' />
            <FieldRef Name='_ComplianceFlags' />
            <FieldRef Name='_ComplianceTag' />
            <FieldRef Name='_ComplianceTagWrittenTime' />
            <FieldRef Name='_ComplianceTagUserId' />
            <FieldRef Name='_IsRecord' />
            <FieldRef Name='AppAuthor' />
            <FieldRef Name='AppEditor' />
          </ViewFields>
          <RowLimit Paged='TRUE'>5000</RowLimit>
        </View>`,
    },
  ];
}
