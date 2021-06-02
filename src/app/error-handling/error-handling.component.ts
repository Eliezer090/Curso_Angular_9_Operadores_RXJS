import { Component, OnInit } from '@angular/core';
import { Observable, of, throwError, timer } from 'rxjs';
import { catchError, map, retry, retryWhen, tap, timeout } from 'rxjs/operators';

@Component({
  selector: 'app-error-handling',
  templateUrl: './error-handling.component.html',
  styleUrls: ['./error-handling.component.css']
})
export class ErrorHandlingComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {

  }

  startTest(){
    let obj: Observable<any> = new Observable((observer)=>{
     for (let i = 0; i < 10; i++) {
       if(i==7){
        observer.error("erro ocorreu na posição: "+i)
       }else{
       observer.next(i);
      }
     } 
    })
    obj
    .pipe(
      map(i=>i*10),
      tap(i=> console.log("before: "+i)),
      catchError(error=>{
         console.error('inside catherror: '+error);
         //retornar um outro valor ao invez do erro em si, vai da complete
         //return of(0)
         //retorna um erro nao vai da complete
         return throwError('thoError: ');
      }),
      //quantas vezes vc quer tentar fazer esse processo, se tentou todas essas vezes e mesmo assim deu erro dae ele larga o erro
     // retry(2),
      //quando que ele vai tentar dnv, nesse caso após 5 segundos ele tenta fazer dnv essa requisição
      retryWhen(i=>timer(5000))
    )
    /**
    .subscribe(
      (i)=>console.log("normal: "+i),
      (err)=>console.error("Erro: "+err),
      ()=>console.log("complete")
    ); */
    let obj2: Observable<any> = new Observable((observer)=>{
      timer(2000).subscribe((n)=>observer.next(1000));
      timer(2000).subscribe((n)=>observer.complete());
    });
    obj2
    .pipe(
      timeout(2600)
    )
    .subscribe(
      (i)=>console.log("N: "+i),
      (err)=>console.error("Erro: "+err),
      ()=>console.log("complete")
    )
  }
}
