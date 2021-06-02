import { Component, OnInit } from '@angular/core';
import { from, fromEvent, interval, Observable, observable, Observer, of, Subscription, timer } from 'rxjs';

@Component({
  selector: 'app-basic-creation',
  templateUrl: './basic-creation.component.html',
  styleUrls: ['./basic-creation.component.css']
})
export class BasicCreationComponent implements OnInit {

  subscription: Subscription = new Subscription();

  constructor() { }

  ngOnInit(): void {
    console.log('oi');
  }

  observableCreate() {
    const hello = new Observable((observer: Observer<string>) => {
      observer.next('hello');
      observer.next('From');
      observer.next('Observer');
      observer.complete();
    });
    this.subscription.add(hello.subscribe(val => console.log(val)));

  }

  fromClick() {
    //Passa item por item dando next em cada item
    from([1, 2, 3, 4, 5, { x: 10, y: 20 }]).subscribe((v) => console.log(v));
    //pode ser dado subscribe tanto dirreto quanto posteriormente
    const source = from([1, 2, 3, 4, 5, { x: 10, y: 20 }]);
    this.subscription.add(source.subscribe((v) => console.log(v)));
  }

  ofClick() {
    //da next 1 vez só em todo o objeto
    of([1, 2, 3, 4, 5, { x: 10, y: 20 }]).subscribe((v) => console.log(v));
  }

  intervalClick() {
    const source = interval(1000);
    this.subscription.add(source.subscribe((v) => {
      console.log(v)
    }))
  }

  timmerClick() {
    //aguarda 3 segundos e chama a cada 1 segundo posteriormente
    const source = timer(3000, 1000);
    this.subscription.add(source.subscribe((v) => {
      console.log(v)
    }))
  }
  fromEventClick() {
    const subscriptio = fromEvent(document,'click').subscribe((e)=>console.log(e));
    this.subscription.add(subscriptio);

  }
  uncubsClick() {
    this.subscription.unsubscribe();
    this.subscription = new Subscription();
  }

  
}
