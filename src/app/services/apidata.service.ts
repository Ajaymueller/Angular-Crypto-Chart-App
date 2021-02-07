import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HistoricDataResponse } from '../models/historic-data-response';
import { Source } from '../models/source';

@Injectable({
  providedIn: 'root'
})
export class ApidataService {

  API_KEY = '1d0c3949282a49158c4ac1ce3f20778215f39c7deee3d5ee586e64b8507d3bf3'

  private readonly apiURLs = {
    [Source.bitcoin]: `https://min-api.cryptocompare.com/data/v2/histoday?fsym=BTC&tsym=USD&limit=500&aggregate=10&e=Kraken&api_key=${this.API_KEY}`,
    [Source.ethereum]: `https://min-api.cryptocompare.com/data/v2/histoday?fsym=ETH&tsym=USD&limit=500&aggregate=10&e=Kraken&api_key=${this.API_KEY}` 
  }

  constructor(private _httpClient: HttpClient) { }

  public get(type: Source): Observable<HistoricDataResponse> {
    let apiUrl = this.apiURLs[type]
    return this._httpClient.get<HistoricDataResponse>(apiUrl);
  }
}