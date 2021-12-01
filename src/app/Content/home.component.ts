import { Component, OnInit } from '@angular/core';
import { APIService } from '../Services/api.service';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { FreqOfNums, rndNums } from '../Models/rnd-numbers.model';

interface Alert {
  type: string;
  message: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {

  fileToUpload: File;
  ReturnMessage: string;
  progress: number;
  message: string;
  showSpinner = false;
  error: string;   
  success: string;
  mean: string; 
  stnDev: string;
  //freqOfNums: FreqOfNums[];
  rndNums: rndNums[];
  LessThan10: string;
  TenTo20: string;
  TwentyT030: string;
  ThirtyT040: string;
  FourtyTo50: string;
  FiftyTo60: string;
  SixtyTo70: string; 
  SeventyTo80: string;
  EightyTo90: string;
  NintyTo100: string;
  

  constructor(private apiService: APIService, private http: HttpClient) { }

  ngOnInit(): void {
    this.showSpinner = true;
    this.error = '';
    this.success = '';
    this.GetFreqOfNums();
    this.Getmean();
    this.GetStnDev();
  }

  onFileSelected(event: Event) {

    this.error = '';

    this.fileToUpload = (event.target as HTMLInputElement).files[0];

    if (this.fileToUpload) {

      this.showSpinner = true;

      const formData: FormData = new FormData();

      formData.append('csvfile', this.fileToUpload, this.fileToUpload.name);
               
      const returnMessage = this.apiService.PostFileToDB(formData);    

      returnMessage.subscribe(
        (message: string) => {
          this.ReturnMessage = message;
          console.log(message);
          this.success = 'File loaded';
          this.GetFreqOfNums();
          this.Getmean();
          this.GetStnDev();            
        },
        (err) => {
          console.log('HTTP Error', err);
          this.error = err.message;
          this.showSpinner = false;
        }
      );   
  }     
}

Getmean() {
  this.apiService.Getmean().subscribe(
   (result:string) => {  
    this.mean = result;
  },
  (err) => {
    console.log('HTTP Error', err);
    this.error = err.message; 
    this.showSpinner = false;
  }
);   
}

GetStnDev() {
  this.apiService.GetStnDev().subscribe(
   (result:string) => {  
    this.stnDev = result;
  },
  (err) => {
    console.log('HTTP Error', err);
    this.error = err.message; 
    this.showSpinner = false;
  }
);   
}

GetFreqOfNums() {
 this.apiService.GetFreqOfNums().subscribe(
  (nums:any) => {    
    if(!!nums[0]) this.LessThan10 = nums[0].join(" "); else this.LessThan10 = "";
    if(!!nums[1]) this.TenTo20 = nums[1].join(" "); else this.TenTo20 = "";
    if(!!nums[2]) this.TwentyT030 = nums[2].join(" "); else this.TwentyT030 = "";
    if(!!nums[3]) this.ThirtyT040 = nums[3].join(" "); else this.ThirtyT040 = "";
    if(!!nums[4]) this.FourtyTo50 = nums[4].join(" "); else this.FourtyTo50 = "";
    if(!!nums[5]) this.FiftyTo60 = nums[5].join(" "); else this.FiftyTo60 = "";
    if(!!nums[5]) this.SixtyTo70 = nums[6].join(" "); else this.SixtyTo70 = "";
    if(!!nums[6]) this.SeventyTo80 = nums[7].join(" "); else this.SeventyTo80 = "";
    if(!!nums[8]) this.EightyTo90 = nums[8].join(" "); else this.EightyTo90 = "";
    if(!!nums[9]) this.NintyTo100 = nums[9].join(" "); else this.NintyTo100 = "";
    this.showSpinner = false;
    // console.log(nums[0]);
  },
  (err) => {
    console.log('HTTP Error', err);
    this.error = err.message; 
    this.showSpinner = false;
  }
);    
}

}
