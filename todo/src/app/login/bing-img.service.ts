
import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Image } from '../todo/domain/entities';

@Injectable()
export class BingImgService {

  imageUrl: string;
  baseUrl: string = `https://api.cognitive.microsoft.com/bing/v5.0/images/search`
  headers = new Headers({
    'Content-Type': 'application/json',
    'Ocp-Apim-Subscription-Key': '275c1fbc23e24f1cb0c93d050b2fc00b'
  });

  constructor(private http: Http) {

  }

  getImageUrl(keyword): Observable<Image[]> {
    this.imageUrl = this.baseUrl + `?q=${keyword}&count=5&mkt=zh-CN&imageType=Photo&size=Large`;
    return this.http.get(this.imageUrl, { headers: this.headers })
      .map(res => res.json().value as Image[])
      .catch(this.handleError);
  }
  private handleError(error: Response) {
    console.error(error);
    return Observable.throw(error.json().error || 'Server error');
  }
}
