import { Component,NgModule, ViewEncapsulation, TemplateRef, ViewContainerRef, Directive, Input} from '@angular/core';
@Directive({ selector: '[RClick]' })
export class Click {
  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainerRef: ViewContainerRef
  ) { }
 /* @Input('RClick') set RClick(time: number): void {
        setTimeout(()=>{
            this.viewContainerRef.createEmbeddedView(this.templateRef);
        }, time);
  }*/
}