import { BaseResourceModel } from "../models/base-resource.model";

import { HttpClient } from '@angular/common/http'
import { Injector } from "@angular/core";

import { Observable, throwError } from 'rxjs'
import { map, catchError } from 'rxjs/operators'

export abstract class BaseResourceService<T extends BaseResourceModel> {

    protected http: HttpClient;

    constructor(
        protected injector: Injector,
        protected baseUrl: string
    ){
        this.http = injector.get(HttpClient);
    }

    getAll(): Observable<T[]> {
        return this.http.get(this.baseUrl).pipe(
          catchError(this.handleError),
          map(this.jsonToResources)  
        )
      }
    
      getById(id: number): Observable<T> {
        const url = `${this.baseUrl}/${id}`
        return this.http.get(url).pipe(
          catchError(this.handleError),
          map(this.jsonToResource)
        )
      }
    
      create(resource: T): Observable<T> {
        return this.http.post(this.baseUrl, resource).pipe(
          catchError(this.handleError),
          map(this.jsonToResource)
        )
      }
    
      update(resource: T): Observable<T> {
        const url = `${this.baseUrl}/${resource.id}`
        return this.http.put(url, resource).pipe(
          catchError(this.handleError),
          map(() => resource)
        )
      }
    
      delete(id: number): Observable<any> {
        const url = `${this.baseUrl}/${id}`;
        return this.http.delete(url).pipe(
          catchError(this.handleError),
          map(() => null)
        )
      }


      protected jsonToResources(jsonData: any[]): T[] {
        const resource: T[] = [];
        jsonData.forEach(element => resource.push(element as T));
        return resource;
      }
    
      protected jsonToResource(jsonData: any): T {
        return jsonData as T;
      }
    
      protected handleError(error: any): Observable<any> {
         console.error('Error:', error);
         return throwError(error);
      }

}