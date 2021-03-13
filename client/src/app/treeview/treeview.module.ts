import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TreeviewComponent } from './treeview/treeview.component';
import { TreeHostComponent } from './tree-host/tree-host.component';



@NgModule({
  declarations: [TreeviewComponent, TreeHostComponent],
  imports: [
    CommonModule
  ],
  exports:[TreeviewComponent]
})
export class TreeviewModule { }
