import { Component, OnInit, ViewChild } from '@angular/core';
import { MatRipple } from '@angular/material/core';
import { from, fromEvent, interval, Observable, Subject, Subscription, timer } from 'rxjs';
import { debounceTime, delay, filter, first, last, map, take, takeUntil, takeWhile, tap } from 'rxjs/operators';

@Component({
  selector: 'app-operators',
  templateUrl: './operators.component.html',
  styleUrls: ['./operators.component.css']
})
export class OperatorsComponent implements OnInit {

  @ViewChild(MatRipple)
  ripple!: MatRipple;

  serachInput: string="";
  radius: number = 40;

  constructor() { }

  ngOnInit(): void {
  }

  mapClick() {
    from([1, 2, 3, 4, 5, 6, 7])
      .pipe(
        map(i => i * 10),
        map(i => "Number: " + i),
        //infinitos maps pode colocar
        delay(1000)
      )
      .subscribe((i) => console.log(i))

    fromEvent(document, 'click')
      .pipe(
        // map((e: MouseEvent)=>{
        //   console.log(e);
        // })


      )
      .subscribe((pos) => console.log(pos));
  }
  //Filtrar as informações que estão sendo geradas
  filterClick() {
    from([1, 2, 3, 4, 5, 6, 7])
      .pipe(
        filter(i => i % 2 == 1)
      )
      .subscribe((pos) => console.log(pos));

    interval(1000)
      .pipe(
        filter(i => i % 2 == 0),
        map(i => 'value: ' + i),
        delay(2000)
      ).subscribe((pos) => console.log(pos));
  }
  //pegar as infos entre os dados, nao para modificar.
  tapClick() {
    interval(1000)
      .pipe(
        tap(i => console.log(i)),
        filter(i => i % 2 == 0),
        map(i => 'value: ' + i),
        delay(2000)
      ).subscribe((pos) => console.log(pos));
  }

  //pegar quantidade exatas de elementos, após pegar o que foi definido ele fecha o subscription, os outros geralmente deixam aberto ex: filter
  takeClick() {
    const observable = new Observable((observer) => {
      let i;
      for (i = 0; i < 20; i++) {
        setTimeout(() => {
          observer.next(Math.floor(Math.random() * 100));
        }, i * 100);

      }
      setTimeout(() => {
        observer.complete()
      }, i * 100);
    });
    const s: Subscription = observable
    .pipe(
      tap(i=>console.log(i)),
      //pega a quantidade de elementos que foi definido
      //take(10)
      //pega o primeiro elemento
      //first()
      //passa por todos e retorna o ultimo elemento (necessita do complete senao fica em loop)
      last()
    )
    .subscribe(v=>console.log('output',v),
    (error)=>console.error(error),
    ()=>console.log('Complete')    );
    const inter = setInterval(()=>{
      console.log('Checking...');
      if(s.closed){
        console.warn('subsciption close');
        clearInterval(inter);
      }
    },200)
  }

  debonceTimeClick(){
    fromEvent(document,'click')
    .pipe(
      tap((e)=>console.log('click')),
      debounceTime(1000)
    )
    .subscribe(
      (e)=>{
        console.log(e)
        this.lauchRipple();
      }
    )
  }

  lauchRipple(){
    const rippleRef = this.ripple.launch({
      persistent:true,
      centered:true
    });
    rippleRef.fadeOut;
  }
  
  //captura o que o cara escreveu e larga em subject
  serachEntry$: Subject<string> = new Subject<string>();
  search(event: any){
    this.serachEntry$.next(this.serachInput);
  }
  
  debonceTimeSearchClick(){
    this.serachEntry$
    .pipe(
      debounceTime(1000)
    )
    .subscribe((s)=>console.log(s))
  }

  //captura o valor e definimos quantos queremos que pega quando atingir ele fecha o subscribe
  takeWhileClick(){
    interval(500)
    .pipe(
      takeWhile((value,index)=>(value<=5))
    )
    .subscribe(
      (i)=>console.log('take: ',i),
      (error)=>console.error(error),
      ()=>console.log("complete")
    )
  }

//necessita de um observable "dueTime$" e quando o observable acabar o takeUntil acaba tbm
//mesma logica do TakeWhile só que aqui é com observable.
  takeUntilClick(){
    let dueTime$ = timer(5000);
    interval(500)
    .pipe(
      takeUntil((dueTime$))
    )
    .subscribe(
      (i)=>console.log('takeUntil: ',i),
      (error)=>console.error(error),
      ()=>console.log("complete")
    )
  }
}
