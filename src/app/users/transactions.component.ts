import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { SplitDialogComponent } from '../models/split-dialog/split-dialog.component';
import { SimpleDialogComponent } from '../simple-dialog/simple-dialog.component';
import { TransactionService } from '../transaction.service';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss']
})
export class TransactionsComponent implements OnInit {
  public displayedColumns: string[] = ['id', 'name', 'date', 'direction', 'amount', 'description', 'currency', 'mcc', 'kind', 'category' ,'categorize', 'split'];
  public dataSource = new MatTableDataSource();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(
    private transactionService: TransactionService,
    private router: Router,
    public dialog: MatDialog,

  ) { }

  ngOnInit(): void {

    this.transactionService.getTransactions().subscribe((transactions: any) => {
      this.dataSource.data = transactions.items;
    })
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  openDialog(transactionId: string, name: string) {
    const dialogRef = this.dialog.open(SimpleDialogComponent, {
      width: '250px',

    });
    dialogRef.componentInstance.beneficiaryName = name;
    dialogRef.componentInstance.transactionId = transactionId;
  }
  openSplitDialog(transactionId: string, amount: string, currency: string) {
    const dialogRef = this.dialog.open(SplitDialogComponent, {
      width: '600px',

    });
    
    dialogRef.componentInstance.transactionId = transactionId;
    dialogRef.componentInstance.amount = amount;
	dialogRef.componentInstance.currency = currency;
  }
  public showUserDetails(userId: number) {
    this.router.navigate(['users/' + userId]);
  }

  public addUser() {
    console.log('addUser');
    this.router.navigate(['users/add-user']);
  }

}
