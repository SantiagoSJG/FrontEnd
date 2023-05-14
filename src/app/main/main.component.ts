import { Component } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent {
  constructor(private apiService: ApiService) {}

  logIn() {
    return this.apiService.getToken();
  }
}
