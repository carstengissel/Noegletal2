import * as models from 'powerbi-models';
import {IEmbedSettings} from "embed";

export interface IEmbedConfigBase {
    settings?:  IEmbedSettings;
    embedUrl?: string;
    uniqueId?: string;
    type?: string;
    token?: string;
    tokenType?: models.TokenType;
    groupId?: string;
    id?: string;
    permissions?: models.Permissions;
    viewMode?: models.ViewMode;
}

