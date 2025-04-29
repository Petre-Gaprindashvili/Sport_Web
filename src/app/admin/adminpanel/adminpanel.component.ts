import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-adminpanel',
  templateUrl: './adminpanel.component.html',
  styleUrls: ['./adminpanel.component.css']
})
export class AdminpanelComponent implements OnInit {
adminEmail: string = '';
isSideBarOpen = true;
constructor(private authservice:AuthService){}

ngOnInit(): void {
this.authservice.getAdminEmail().subscribe(email=>{
  this.adminEmail = email;
})
}
toggleSideBar(){
this.isSideBarOpen = !this.isSideBarOpen;
}
}
