import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { FreqOfNums } from '../Models/rnd-numbers.model';


@Injectable({
  providedIn: 'root'
})
export class APIService {

  constructor(private http: HttpClient) { }

  baseAPIUrl = environment.baseAPIUrl;

  PostFileToDB(_fileData: FormData) {    

    return this.http.post<string>(this.baseAPIUrl +   'PostFileData', _fileData); 
  }

  Getmean() {    
    return this.http.get<string>(this.baseAPIUrl + 'Getmean');
  }

  GetStnDev() {    
    return this.http.get<string>(this.baseAPIUrl + 'GetStnDev');
  }

  GetFreqOfNums() {    
    return this.http.get<FreqOfNums[]>(this.baseAPIUrl + 'GetFreqOfNums');
  }


}
