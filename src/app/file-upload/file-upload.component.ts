import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { map } from 'rxjs/operators';
import { TransactionService } from '../transaction.service';
@Component({
    selector: 'app-file-upload',
    templateUrl: './file-upload.component.html',
    //    styleUrls: ['./split-dialog.component.scss']
})
export class FileUploadComponent implements OnInit {

    public srcResult: any;
    public reader: FileReader;
    fileToUpload: File | null = null;
    constructor(

        public dialog: MatDialog,
        public transactionService: TransactionService,


    ) { }

    ngOnInit(): void {
        this.reader = new FileReader;
    }
    handleFileInput(files: FileList) {
        this.fileToUpload = files.item(0);
    }
    uploadFileToActivity() {
        this.transactionService.transactionsImport(this.fileToUpload).subscribe(data => {
            // do something, if upload success
        }, error => {
            console.log(error);
        });
    }
    transactionsImport(event : any) {
        let fileList: FileList = event.target.files;
        if(fileList.length > 0) {
            let file: File = fileList[0];
            let formData:FormData = new FormData();
            formData.append('uploadFile', file, file.name);
            let headers = new Headers();
            headers.append('Content-Type', 'multipart/form-data');
            headers.append('Accept', 'application/json');
            this.transactionService.transactionsImport(formData).pipe(
                map((res) : any => res))
                .subscribe(
                    data => console.log('success'),
                    error => console.log(error)
                )
        }
    }
    categoriesImport(event : any) {
        let fileList: FileList = event.target.files;
        if(fileList.length > 0) {
            let file: File = fileList[0];
            let formData:FormData = new FormData();
            formData.append('uploadFile', file, file.name);
            let headers = new Headers();
            headers.append('Content-Type', 'multipart/form-data');
            headers.append('Accept', 'application/json');
            this.transactionService.categoriesImport(formData).pipe(
                map((res) : any => res))
                .subscribe(
                    data => console.log('success'),
                    error => console.log(error)
                )
        }
    }
}

