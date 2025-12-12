/* eslint-disable @typescript-eslint/no-namespace */

import { constants } from "../../../config/constants";
import { ICamlQuery } from "../../../types/Types";

export namespace PMPredrillingQueries {
  export const getCamlQuery = (
    projectId: number,
    shiftId: number,
    techniqueId: number
  ): ICamlQuery[] => [
    {
      ListName: constants.ListName.PM_PreDrillingData,
      CamlQuery: `
        <View Scope='RecursiveAll'>
          <Query>
            <OrderBy>
              <FieldRef Name='Created' Ascending='FALSE'/>
            </OrderBy>
         <Where>
              <And>
                <And>
                  <And>
                    <Eq>
                      <FieldRef Name='Project' LookupId='TRUE'/>
                      <Value Type='Lookup'>${projectId}</Value>
                    </Eq>    
                    <Eq>
                      <FieldRef Name='ShiftDetail' LookupId='TRUE'/>
                      <Value Type='Lookup'>${shiftId}</Value>
                    </Eq>
                  </And>
                  <Eq>
                    <FieldRef Name='Technique' LookupId='TRUE'/>
                    <Value Type='Lookup'>${techniqueId}</Value>
                  </Eq>
                </And>
                <Eq>
                  <FieldRef Name='IsDeleted'/>
                  <Value Type='Boolean'>0</Value>
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
            <FieldRef Name='Number' />
            <FieldRef Name='Technique' />
            <FieldRef Name='Equipments' />
            <FieldRef Name='ShiftDetail' />
            <FieldRef Name='Predrilling' />
            <FieldRef Name='PredrillingStartTime' />
            <FieldRef Name='PredrillingEndTime' />
            <FieldRef Name='PredrillingDuration' />
            <FieldRef Name='PredrillingDepth' />
            <FieldRef Name='PredrillingDiameter' />
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
        </View>`.trim(),
    },
  ];
}
