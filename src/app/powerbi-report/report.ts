export interface IReportNoegletal {
    ReportId: string;
    ReportName: string;
    ShortDescription: string;
    Type: string;
    ExternalId: string;
    WebUrl: string;
    Parent: string;
    ShowUpdate: boolean;
    Updated: string;
    RouteUrl: string;
    Dataset: string;
    GroupId: string;
    RegTid: string;
    RegInit: string;
    LongDescription: string;
    System: string;
    ReportOwner:string;
}


export enum Folder {
    Globale = 0,
    Afdeling = 1,
    Personlige = 2
}

