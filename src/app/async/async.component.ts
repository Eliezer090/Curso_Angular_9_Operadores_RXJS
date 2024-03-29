import { Component, OnInit } from '@angular/core';
import { observable, Observable } from 'rxjs';
import { delay, map, toArray } from 'rxjs/operators';

interface User{
  login:string,
  name:string
}

@Component({
  selector: 'app-async',
  templateUrl: './async.component.html',
  styleUrls: ['./async.component.css']
})
export class AsyncComponent implements OnInit {

  options!: Observable<string[]>;
  user!: Observable<User>;

  constructor() { }

  ngOnInit(): void {
    this.options = new Observable(
      (observer)=>{
        for(let i=0; i<10;i++){
          observer.next("this my i"+i);
        }
        observer.complete();
      }
    )
    .pipe(
      map(s=>s+"!"),
      toArray(),
      delay(2000)
    );
//Quando se usa o async ele da o subscriber automaticamente
    //this.options.subscribe(s=>console.log(s));

    this.user = new Observable<User>((observer)=>{
      let name=['nome 1','noem 2','nome 3']
      let logins=['no1','no2','no3']
      let i = 0;
      setInterval(()=>{
        if(i==3){
          observer.complete()
        }else{
          observer.next({login:logins[i],name:name[i]});
        }
        i++;
      },2000);      
    });
    //Quando se usa o async ele da o subscriber automaticamente
  //  this.user.subscribe(s=>console.log(s));
  }

  

}
