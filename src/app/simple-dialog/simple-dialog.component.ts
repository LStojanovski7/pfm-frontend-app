import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Category } from '../models/interfaces';
import { TransactionService } from '../transaction.service';

@Component({
  selector: 'app-simple-dialog',
  templateUrl: './simple-dialog.component.html',
  styleUrls: ['./simple-dialog.component.scss']
})
export class SimpleDialogComponent implements OnInit {
  public categories: Category[];
  public category: FormControl = new FormControl;
  public transactionToUpdate: any = {};
  public beneficiaryName: string;
  public transactionId: string;

  constructor(
    public dialogRef: MatDialogRef<SimpleDialogComponent>,
    public dialog: MatDialog,
    private transactionService: TransactionService,

  ) { }

  ngOnInit(): void {
    this.category.setValidators([Validators.required]);
    this.transactionService.getCategories().subscribe((fetchedCategories: any) => {
      this.categories = fetchedCategories.items;
    })
  }

  public confirm() {
    this.transactionToUpdate.catCode = this.category.value.code;
    this.transactionService.updateCategory(this.transactionId, this.transactionToUpdate.catCode).subscribe((res) => {
      alert('Transaction has been categorized ')
	  window.location.reload();
   
  }) 
  this.dialogRef.close(true);

}

  public cancel() {
    this.dialogRef.close(false);
  }

}
