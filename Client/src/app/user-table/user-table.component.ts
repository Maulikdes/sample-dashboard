import { AfterViewInit, Component, OnInit, ViewChild, Inject, ChangeDetectorRef } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { UserTableDataSource } from './user-table-datasource';
import { BsModalService } from 'ngx-bootstrap/modal'
import { BsModalRef } from 'ngx-bootstrap';
import { UserInfo } from '../modals/user-info';
import { UserService } from '../services/user.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-user-table',
  templateUrl: './user-table.component.html',
  styleUrls: ['./user-table.component.css']
})
export class UserTableComponent implements AfterViewInit, OnInit {
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild(MatTable, { static: false }) table: MatTable<UserInfo>;

  public dataSource: UserTableDataSource;
  public modalRef: BsModalRef;
  public selectedUser: UserInfo;
  public isShowTable: boolean = true;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['name', 'email', 'role', 'status', 'actions'];
  userData: UserInfo[] = [];
  action: string;

  ngOnInit() {
    let ctrl = this;
    this.userService.getUsers().subscribe(users => {
      this.userData = users;
      if (!ctrl.dataSource) {
        ctrl.dataSource = new UserTableDataSource();
      }
      ctrl.dataSource.setTableData(users);
    });
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.setTableData(
      this.userData.filter(user => {
        return user.name.toLowerCase().includes(filterValue) || user.email.toLowerCase().includes(filterValue)
          || user.status.toLowerCase().includes(filterValue) || user.role.toLowerCase().includes(filterValue)
          || (!!user.mobile && user.mobile.toString().includes(filterValue))
      })
    );
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }

  constructor(private dialogService: BsModalService, private userService: UserService, private toastr: ToastrService) {
  }

  onEditClick(user, modal): void {
    this.action = "edit";
    this.selectedUser = user;
    this.modalRef = this.dialogService.show(modal);
  }

  onCreateClick(modal): void {
    this.action = "add";
    this.selectedUser = undefined;
    this.modalRef = this.dialogService.show(modal);
  }

  onDeleteClick(user, modal): void {
    this.selectedUser = user;
    this.modalRef = this.dialogService.show(modal);
  }

  onCloseClick(): void {
    this.modalRef.hide();
  }


  // -------- Callbacks

  onSuccessCallback(): void {
    this.toastr.success("The User has been " + this.action == "add" ? "added" : "updated" + " Successfully!");
    this.modalRef.hide();
  }

  onActionFailedCallback(): void {
    this.toastr.error("Error occured while " + (this.action == "add" ? "adding" : "updating") + " user!");
    // this.modalRef.hide();
  }

  onDeleteUser(): void {
    this.userService.deleteUser(this.selectedUser.id).subscribe(
      data => {
        this.toastr.success("The User has been deleted");
        this.modalRef.hide();
      }
    );
  }

}