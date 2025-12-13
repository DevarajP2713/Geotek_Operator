/* eslint-disable @rushstack/no-new-null */

import { IDropValue } from "../../../types/Types";

export interface ISearchObject {
  Search: string;
}

export interface IProjectsObject {
  ID: number | null;
  Title: string;
  Name: string;
}

export interface ITechniquesObject {
  ID: number | null;
  TechniqueName: string;
}

export interface IShiftDetailsObject {
  ID: number | null;
  ShiftDate: string;
  ShiftType: "Day" | "Night";
}

export interface IWorkTypeDetailsObject {
  ID: number | null;
  ProjectName: IDropValue | null;
  Shift: IDropValue | null;
  Technique: IDropValue | null;
  Predrilling: boolean;
  PredrillingNumber: IDropValue[];
}
