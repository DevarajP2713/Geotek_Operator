/* eslint-disable @typescript-eslint/no-namespace */

import { constants } from "../../../config/constants";
import { ICamlQuery } from "../../../types/Types";

export namespace ShiftQueries {
  export const getCamlQuery = (projectId: number): ICamlQuery[] => [
    {
      ListName: constants.ListName.PM_Production_Shift,
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
            <FieldRef Name='ID' />
            <FieldRef Name='Title' />
            <FieldRef Name='LinkTitle' />
            <FieldRef Name='_ColorTag' />
            <FieldRef Name='ShiftDate' />
            <FieldRef Name='ShiftType' />
            <FieldRef Name='Summary' />
            <FieldRef Name='Project' />
            <FieldRef Name='ComplianceAssetId' />
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

  export const getShiftCamlQuery = (ShiftId: number): ICamlQuery[] => [
    {
      ListName: constants.ListName.PM_Production_Shift,
      CamlQuery: `
        <View Scope='RecursiveAll'>
          <Query>
            <OrderBy>
              <FieldRef Name='Created' Ascending='FALSE'/>
            </OrderBy>
            <Where>
              <Eq>
                <FieldRef Name='ID' LookupId='TRUE'/>
                <Value Type='Counter'>${ShiftId}</Value>
              </Eq>
            </Where>
          </Query>
          <ViewFields>
            <FieldRef Name='ID' />
            <FieldRef Name='Title' />
            <FieldRef Name='LinkTitle' />
            <FieldRef Name='_ColorTag' />
            <FieldRef Name='ShiftDate' />
            <FieldRef Name='ShiftType' />
            <FieldRef Name='Summary' />
            <FieldRef Name='Project' />
            <FieldRef Name='ComplianceAssetId' />
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
