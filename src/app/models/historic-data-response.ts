import { HistoricData } from './data-response';

export interface HistoricDataResponse {
    Response: string;
    Message: string;
    HasWarning: boolean;
    Type: number;
    RateLimit: any;
    Data: HistoricData;
}
