import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { TransactionService } from 'src/app/transaction.service';
import { Category, Split } from '../interfaces';

@Component({
    selector: 'app-split-dialog',
    templateUrl: './split-dialog.component.html',
    styleUrls: ['./split-dialog.component.scss']
})
export class SplitDialogComponent implements OnInit {
    public categories: Category[];
    public transactionToUpdate: any = {};
    public beneficiaryName: string;
    public transactionId: string;
    public orderForm: FormGroup;
    public items: FormArray;
    public amount: string;
	public currency: string;
    public valuesToSubmit: any;
    public items2: any;
    public splitData: any[];

    constructor(
        public dialogRef: MatDialogRef<SplitDialogComponent>,
        public dialog: MatDialog,
        private transactionService: TransactionService,
        private formBuilder: FormBuilder

    ) { }

    ngOnInit(): void {
        this.transactionService.getCategories().subscribe((fetchedCategories: any) => {
            this.categories = fetchedCategories.items;
        })
        this.orderForm = this.formBuilder.group({
            catcode: new FormControl('', [Validators.required]),
            amount: new FormControl('', [Validators.required,   Validators.pattern('\\-?\\d*\\.?\\d{1,9}')]),
            items: this.formBuilder.array([this.createItem()])
        });
        this.items2 = (this.orderForm.get('items') as FormArray).controls
        this.valuesToSubmit = (this.orderForm.controls.items as FormArray).value
    }

    createItem(): FormGroup {
        return this.formBuilder.group({
            catcode: new FormControl('',[Validators.required] ),
            amount: new FormControl('',[Validators.required,  Validators.pattern('\\-?\\d*\\.?\\d{1,9}')] ),
        });
    }

    createNewInput(): void {
        this.items = this.orderForm.get('items') as FormArray;
        this.items.push(this.createItem());
    }

    removeLast() {
        this.items.removeAt(this.items.length - 1);
    }
 
    public confirm() {

        if (this.orderForm.controls.items.valid) {

            this.valuesToSubmit = (this.orderForm.controls.items as FormArray).value
            this.valuesToSubmit.map((x: any) => x.catcode = x.catcode.code)
            this.transactionService.splitTransaction(this.transactionId, this.valuesToSubmit).subscribe((res) => {
                alert('Transaction has been split')
            })
            this.dialogRef.close(true);
        }
    }



    public cancel() {
        this.dialogRef.close(false);
    }

}
