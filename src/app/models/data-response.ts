import { HistoricPrice } from './historic.price'

export interface HistoricData {
    Aggregated: boolean;
    TimeFrom: number;
    TimeTo: number;
    Data: HistoricPrice[];
}
