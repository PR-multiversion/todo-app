import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private api = inject(HttpClient);
  constructor() {}

  getData() {
    return this.api.get<any>(environment.API_URL + 'tasks').pipe(
      map((response) => {
        return response;
      })
    );
  }
  getSingleData(id: any) {
    return this.api.get<any>(environment.API_URL + `task/${id}`).pipe(
      map((response) => {
        return response;
      })
    );
  }
  postData(data: any) {
    return this.api.post<any>(environment.API_URL + 'task', data).pipe(
      map((response) => {
        return response;
      })
    );
  }
  deleteData(id: any) {
    return this.api.delete<any>(environment.API_URL + `task/${id}`).pipe(
      map((response) => {
        return response;
      })
    );
  }
  updateData(id: any, data: any) {
    return this.api.put<any>(environment.API_URL + `task/${id}`, data).pipe(
      map((response) => {
        return response;
      })
    );
  }
}
