import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-view-child',
  templateUrl: './view-child.component.html',
  styleUrls: ['./view-child.component.css']
})
export class ViewChildComponent implements OnInit {

  /*
************************** TESTES DO ViewChild OCORREU MUDANÇAS ***************************************

    Duas maneiras de fazer esse ViewChild, apartir de agora a ! poderá estar presente ou setar undefined
      1- por padrão o static é false e o seu valor é utilizado no ngAfterViewInit
        @ViewChild('myrect') myrect!: ElementRef;
        ngAfterViewInit() {
         console.log(this.myrect)
        }
      2- Se for setado static: true o mesmo vai estar disponivel os valores no ngOnInit e nas funções subsequentes.
          @ViewChild('myrect',{static: true}) myrect!: ElementRef;
          ngOnInit(): void {
            console.log(this.myrect)
          }
    OBS: Se for setado static: true tanto no ngOnInit quanto nas funçoes subsequentes que utilizam esse child quanto no proprio ngAfterViewInit estará disponivel tambem,
    ou seja seta como true essa bosta e pode usar onde quiser, e nao pode esquecer da ! que o angular decidiu colocar, é para se caso nao encontrar ele vai te retornar undefined.
  */
 @ViewChild('myrect',{static: true}) myrect!: ElementRef;
 top: number = 40;
 left:number = 40;
 constructor() { }

 ngOnInit(): void {
   console.log(this.myrect)
   this.teste()
 }

 teste(){
   console.log(this.myrect)
 }

 ngAfterViewInit() {
   console.log(this.myrect)
 }

}
