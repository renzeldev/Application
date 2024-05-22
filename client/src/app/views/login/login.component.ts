import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { API_URL } from "../../constants";
import { getToken } from "../../services/auth";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  hasToken: boolean = true;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    const token = getToken();

    if (token === null) {
      this.hasToken = false;
    }
  }

  logout() {
    window.localStorage.removeItem('user.auth');
    this.hasToken = false;
  }

  login() {
    this.http.get(`${API_URL}/login`).subscribe((response: any) => {
      const expire = Date.now() + 1000 * 60 * 60; // 1 hour
      
      window.localStorage.setItem("user.auth", JSON.stringify({ expire, token: response.JWT }));
      this.hasToken = true;
    })
  }
}
