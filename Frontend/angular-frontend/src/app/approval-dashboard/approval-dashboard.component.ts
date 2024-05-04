// approval-dashboard.component.ts
import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { User } from '../models/user';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-approval-dashboard',
  templateUrl: './approval-dashboard.component.html',
  styleUrls: ['./approval-dashboard.component.css']
})
export class ApprovalDashboardComponent implements OnInit {

  usersWithPendingStatus: User[] = [];
  dataSource!: MatTableDataSource<User>;
  displayedColumns: string[] = ['id', 'username', 'email', 'status', 'actions'];


  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userService.getUsersWithPendingStatus().subscribe(users => {
      this.usersWithPendingStatus = users;
      this.dataSource = new MatTableDataSource(this.usersWithPendingStatus);
    });
  }

  approveUser(userId: number): void {
    this.userService.updateUserStatus(userId, 'approved').subscribe(() => {
      // Refresh the list of users with pending status after updating
      this.refreshUsersWithPendingStatus();
    });
  }

  denyUser(userId: number): void {
    this.userService.updateUserStatus(userId, 'denied').subscribe(() => {
      // Refresh the list of users with pending status after updating
      this.refreshUsersWithPendingStatus();
    });
  }

  private refreshUsersWithPendingStatus(): void {
    this.userService.getUsersWithPendingStatus().subscribe(users => {
      this.usersWithPendingStatus = users;
      this.dataSource.data = this.usersWithPendingStatus;
    });
  }

}
