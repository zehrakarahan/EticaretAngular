import { AfterViewInit, Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { TextBoxComponent } from '@progress/kendo-angular-inputs';
import { SVGIcon, eyeIcon } from '@progress/kendo-svg-icons';
import { UserModel } from './model/userModel';
import {ActivatedRoute, Router} from "@angular/router";
import { AuthenticationService } from './service/authentication.service';
@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  // styleUrls: [ './app.component.css' ],
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./styles.css'],
})
export class AppComponent  implements AfterViewInit,OnInit{
  
  constructor(private authService:AuthenticationService, private router: Router) {
  

  }
  ngOnInit(): void {
    
  }
  public ngAfterViewInit(): void {
    
  }
}
