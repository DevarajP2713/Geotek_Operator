/* eslint-disable @typescript-eslint/no-namespace */
import { constants } from "../../../config/constants";
import { ICamlQuery } from "../../../types/Types";

export namespace camlQuery {
  export const Projects: ICamlQuery = {
    ListName: constants.ListName.PM_Projects,
    CamlQuery: `
        <View Scope='RecursiveAll'>
          <Query>
            <OrderBy>
              <FieldRef Name='Created' Ascending='FALSE'/>
            </OrderBy>
          </Query>
          <ViewFields>
            <FieldRef Name='Title' />
            <FieldRef Name='LinkTitle' />
            <FieldRef Name='_ColorTag' />
            <FieldRef Name='ComplianceAssetId' />
            <FieldRef Name='ProjectManager' />
            <FieldRef Name='ProjectTeam' />
            <FieldRef Name='City' />
            <FieldRef Name='State' />
            <FieldRef Name='Status' />
            <FieldRef Name='LeadDate' />
            <FieldRef Name='BidDueDate' />
            <FieldRef Name='PricingLevel' />
            <FieldRef Name='Address' />
            <FieldRef Name='ProjectExecutive' />
            <FieldRef Name='ProjectCount' />
            <FieldRef Name='Name' />
            <FieldRef Name='Description' />
            <FieldRef Name='ChannelSiteName' />
            <FieldRef Name='ChannelName' />
            <FieldRef Name='siteURL' />
            <FieldRef Name='Customer' />
            <FieldRef Name='ProjectFrom' />
            <FieldRef Name='OpportunityNo' />
            <FieldRef Name='StartDate' />
            <FieldRef Name='LastDayOnTheJob' />
            <FieldRef Name='InitiationDate' />
            <FieldRef Name='MarketSegment' />
            <FieldRef Name='Technique' />
            <FieldRef Name='Region' />
            <FieldRef Name='GeotechnicalFirm' />
            <FieldRef Name='GeotechnicalEngineer' />
            <FieldRef Name='MaterialSupplier' />
            <FieldRef Name='FuelSupplier' />
            <FieldRef Name='CraneSupplier' />
            <FieldRef Name='DrillingRigSupplier' />
            <FieldRef Name='DesignEngineer' />
            <FieldRef Name='DesignReviewer' />
            <FieldRef Name='SubmittalDueDate' />
            <FieldRef Name='RevisionNumber' />
            <FieldRef Name='CADFileReceived' />
            <FieldRef Name='LoadsReceived' />
            <FieldRef Name='LoadTestRequired' />
            <FieldRef Name='CCIPOrOCIP' />
            <FieldRef Name='CertifiedPayroll' />
            <FieldRef Name='BuyAmerican' />
            <FieldRef Name='ContractRecived' />
            <FieldRef Name='ContractSigned' />
            <FieldRef Name='SOV' />
            <FieldRef Name='COISubmitted' />
            <FieldRef Name='NoticeToOwner' />
            <FieldRef Name='LostReason' />
            <FieldRef Name='LostTo' />
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
  };
}
