import { Component } from '@angular/core';
import { HttpClient} from '@angular/common/http';
@Component({
 selector: 'app-root',
 templateUrl: './app.component.html',
 styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private http: HttpClient) { }
  temp:string='';
  result:number=0;
  input:string = '';
clickFunction(s: string){
if(s!='='&&s!='del'&&s!='+'&&s!='×'&&s!='/'&&s!='='&&s!='%'&&s!='c'&&s!='-'&&s!='ce'&&s!='⅟'&&s!='±'&&s!='²'&&s!='√'){
if(this.input==''+this.result){
  this.input=s;
  this.temp=this.input;
  this.result=0;
}
else{
this.input = this.input + s;
this.temp=this.input;}
}
else if(s=='del'){
  this.input=this.input.substring(0, this.input.length - 1);
  this.temp=this.input;
}
else if(s=='c'||s=='ce'){
  this.input='';
  this.result=0;
  this.temp=this.input;
}
if(s=='+'||s=='-'||s=='×'||s=='/'||s=='='){
  let num1=this.input;
  this.http.get('http://localhost:8090/hello',{responseType:'text',observe: 'response',params:{num1}}).subscribe(
  data=>{
  this.result= parseFloat( (data.body as string));
  this.input=''+this.result;
  //this.temp=this.input;
  if(s!='='){
  this.input=this.input+s;
  this.temp=this.input;}
       } 
     ); 
}
else if((s=='%'||s=='⅟'||s=='√'||s=='²'||s=='±')&& this.input!=''){
  this.input=this.input+s;
  this.temp=this.input;
  let num1=this.input;
  this.http.get('http://localhost:8090/hello',{responseType:'text',observe: 'response',params:{num1}}).subscribe(
  data=>{
  this.result= parseFloat( (data.body as string));
 // this.input=''+this.result;
 if(this.input[0]=='-'&&s=='√'){
  this.input='';
  this.temp='Error';
  this.result=0;
}
else if(this.input[0]=='-'&&s=='²'){
  this.input=''+this.result;
  this.input=this.input.substring(1,this.input.length );
  this.result=parseFloat(this.input);
  num1=num1.substring(1,num1.length );
  let ans='';
  let f=true
  let index=0;
  for(let i=num1.length-2;i>=0;i--){
    if(num1[i]=='+'||num1[i]=='-'||num1[i]=='/'||num1[i]=='×'){
      f=false;
      index=i;
      break;
    }
    else{
      ans=num1[i]+ans;
    }
  }
  if(f){
    this.temp='sqr'+'('+num1.substring(0, num1.length - 1)+')';
  }
  else{
    this.temp=num1.substring(0,index+1)+'sqr'+'('+ans+')';
  }
}
 else if(s=='√'){
    this.input=''+this.result;
    let ans='';
    let f=true
    let index=0;
    for(let i=num1.length-2;i>=0;i--){
      if(num1[i]=='+'||num1[i]=='-'||num1[i]=='/'||num1[i]=='×'){
        f=false;
        index=i;
        break;
      }
      else{
        ans=num1[i]+ans;
      }
    }
    if(f){
      this.temp='√'+'('+num1.substring(0, num1.length - 1)+')';
    }
    else{
      this.temp=num1.substring(0,index+1)+'√'+'('+ans+')';
    }
   
  }
  else if(s=='²'){
    this.input=''+this.result;
    
    let ans='';
    let f=true
    let index=0;
    for(let i=num1.length-2;i>=0;i--){
      if(num1[i]=='+'||num1[i]=='-'||num1[i]=='/'||num1[i]=='×'){
        f=false;
        index=i;
        break;
      }
      else{
        ans=num1[i]+ans;
      }
    }
    if(f){
      this.temp='sqr'+'('+num1.substring(0, num1.length - 1)+')';
    }
    else{
      this.temp=num1.substring(0,index+1)+'sqr'+'('+ans+')';
    }
  }
  else if(s=='⅟'){
    this.input=''+this.result;      
    let ans='';
    let f=true
    let index=0;
    for(let i=num1.length-2;i>=0;i--){
      if(num1[i]=='+'||num1[i]=='-'||num1[i]=='/'||num1[i]=='×'){
        f=false;
        index=i;
        break;
      }
      else{
        ans=num1[i]+ans;
      }
    }
    if(f){
      this.temp='1/'+'('+num1.substring(0, num1.length - 1)+')';
    }
    else{
      this.temp=num1.substring(0,index+1)+'1/'+'('+ans+')';
    }
  }
  else if(s=='±'){
    this.input=''+this.result;
    this.temp=this.input;
  }
    } 
     ); 
}
}
}
  

