import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TransactionsComponent } from './users/transactions.component';

const routes: Routes = [
  {
    path: 'transactions',
    component: TransactionsComponent
  },
  {
    path: '',
    component: TransactionsComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
