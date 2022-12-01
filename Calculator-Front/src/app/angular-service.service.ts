import { HttpClient, HttpParams, HttpResponseBase } from '@angular/common/http';
import { Injectable } from '@angular/core';
let message: string="";
@Injectable({
 providedIn: 'root'
})

export class AngularServiceService {

 message: string | null | undefined;
 constructor(private http: HttpClient) { }

javaCall(num1:string,op:string,num2:string){
 console.log(" services is working fine.......");
 this.http.get('http://localhost:8090/hello',{responseType:'text',observe: 'response',params:{num1,op,num2} });
  }

}