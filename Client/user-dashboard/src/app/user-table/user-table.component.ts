import { AfterViewInit, Component, OnInit, ViewChild, Inject } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { UserTableDataSource, UserTableItem } from './user-table-datasource';
import { BsModalService } from 'ngx-bootstrap/modal'
import { BsModalRef } from 'ngx-bootstrap';
import { UserCreatorComponent } from '../user-creator/user-creator.component';

@Component({
  selector: 'app-user-table',
  templateUrl: './user-table.component.html',
  styleUrls: ['./user-table.component.css']
})
export class UserTableComponent implements AfterViewInit, OnInit {
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: false}) sort: MatSort;
  @ViewChild(MatTable, {static: false}) table: MatTable<UserTableItem>;

  dataSource: UserTableDataSource;
  public modalRef: BsModalRef;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['name', 'email', 'role', 'status', 'actions'];

  ngOnInit() {
    this.dataSource = new UserTableDataSource();
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }

  constructor(private dialogService:BsModalService){

  }

  onEditClick(): void{
    alert("clicked");
  }

  openDialog(modal):void{
    this.modalRef = this.dialogService.show(modal);
    this.modalRef.content.onClose.subscribe(result => {
      console.log('results', result);
  })
  }
}