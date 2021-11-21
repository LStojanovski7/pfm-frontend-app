import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subscriber } from 'rxjs';
import { Split } from './models/interfaces';


@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  private options = { headers: new HttpHeaders().set('Content-Type', 'application/json').set('responseType', 'text'), };
  //private multipartOptions = { headers: new HttpHeaders().set('Content-Type', 'text/csv') }
  //private multipartOptions = { headers: { 'Content-Type': undefined }};
  constructor(private http: HttpClient) { }
  public getCategories() {
    return this.http.get('http://localhost:6160/categories')
  }

  public getTransactions() {
    return this.http.get("http://localhost:6160/transactions/?pageSize=2000");
  }

  public updateCategory(transactionId: any, categoryCode: any[]) {
    return this.http.post("http://localhost:6160/transactions/" + transactionId + "/categorize", {
      catcode: categoryCode,
    }, this.options
    )
  }

  public splitTransaction(transactionId: any, splits: Split[]) {
    return this.http.post("http://localhost:6160/transactions/" + transactionId + "/split", {
      splits: splits,
    }, this.options
    )
  }

  public transactionsImport(fileNode: any) {
    return this.http.post('http://localhost:6160/transactions/import', fileNode);
  }
  public categoriesImport(fileNode: any) {
    return this.http.post('http://localhost:6160/categories/import', fileNode);
  }
}
