import { DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { map } from 'rxjs/operators';
import { Observable, of as observableOf, merge } from 'rxjs';

// TODO: Replace this with your own data model type
export interface UserTableItem {
  name: string;
  id: number;
  email: string;
  role: string;
  status: string;
}

// TODO: replace this with real data from your application
const EXAMPLE_DATA: UserTableItem[] = [
  {id: 1, name: 'Hydrogen', email:'abc@xyz.com', role:'Admin', status:'Active'},
  {id: 2, name: 'Helium', email:'pqr@xyz.com', role:'Admin', status:'Active'},
  {id: 3, name: 'Lithium', email:'ngh@xyz.com', role:'Admin', status:'Active'},
  {id: 4, name: 'Beryllium', email:'nmnm@xyz.com', role:'Admin', status:'Active'},
  {id: 5, name: 'Boron', email:'erew@xyz.com', role:'Customer Executive', status:'Active'},
  {id: 6, name: 'Carbon', email:'erer@xyz.com', role:'Customer Executive', status:'Active'},
  {id: 7, name: 'Nitrogen', email:'uyuy@xyz.com', role:'Customer Executive', status:'Active'},
  {id: 8, name: 'Oxygen', email:'sdf@xyz.com', role:'Customer Executive', status:'Active'},
  {id: 9, name: 'Fluorine', email:'fdf@xyz.com', role:'Customer Executive', status:'Pending'},
  {id: 10, name: 'Neon', email:'vcbc@xyz.com', role:'Customer Executive', status:'Pending'},
  {id: 11, name: 'Sodium', email:'kjj@xyz.com', role:'Customer Executive', status:'Pending'},
  {id: 12, name: 'Magnesium', email:'vbvb@xyz.com', role:'Customer Executive', status:'Pending'},
  {id: 13, name: 'Aluminum', email:'gnvn@xyz.com', role:'Customer Executive', status:'Pending'},
  {id: 14, name: 'Silicon', email:'fgf@xyz.com', role:'Admin', status:'Pending'},
  {id: 15, name: 'Phosphorus', email:'bvbv@xyz.com', role:'Admin', status:'Pending'},
  {id: 16, name: 'Sulfur', email:'ere@xyz.com', role:'Admin', status:'Inactive'},
  {id: 17, name: 'Chlorine', email:'yuty@xyz.com', role:'Admin', status:'Inactive'},
  {id: 18, name: 'Argon', email:'werwe@xyz.com', role:'Admin', status:'Inactive'},
  {id: 19, name: 'Potassium', email:'nbmnb@xyz.com', role:'Admin', status:'Inactive'},
  {id: 20, name: 'Calcium', email:'fgf@xyz.com', role:'Admin', status:'Inactive'},
];

/**
 * Data source for the UserTable view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class UserTableDataSource extends DataSource<UserTableItem> {
  data: UserTableItem[] = EXAMPLE_DATA;
  paginator: MatPaginator;
  sort: MatSort;

  constructor() {
    super();
  }

  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */
  connect(): Observable<UserTableItem[]> {
    // Combine everything that affects the rendered data into one update
    // stream for the data-table to consume.
    const dataMutations = [
      observableOf(this.data),
      this.paginator.page,
      this.sort.sortChange
    ];

    return merge(...dataMutations).pipe(map(() => {
      return this.getPagedData(this.getSortedData([...this.data]));
    }));
  }

  /**
   *  Called when the table is being destroyed. Use this function, to clean up
   * any open connections or free any held resources that were set up during connect.
   */
  disconnect() {}

  /**
   * Paginate the data (client-side). If you're using server-side pagination,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getPagedData(data: UserTableItem[]) {
    const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
    return data.splice(startIndex, this.paginator.pageSize);
  }

  /**
   * Sort the data (client-side). If you're using server-side sorting,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getSortedData(data: UserTableItem[]) {
    if (!this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = this.sort.direction === 'asc';
      switch (this.sort.active) {
        case 'name': return compare(a.name, b.name, isAsc);
        case 'email': return compare(a.email, b.email, isAsc);
        case 'role': return compare(a.role, b.role, isAsc);
        case 'status': return compare(a.status, b.status, isAsc);
        default: return 0;
      }
    });
  }
}

/** Simple sort comparator for example ID/Name columns (for client-side sorting). */
function compare(a, b, isAsc) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
