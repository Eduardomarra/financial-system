import { BaseResourceModel } from "../models/base-resource.model";

import { HttpClient } from '@angular/common/http'
import { Injector } from "@angular/core";

import { Observable, throwError } from 'rxjs'
import { map, catchError } from 'rxjs/operators'

export abstract class BaseResourceService<T extends BaseResourceModel> {

    protected http: HttpClient;

    constructor(
        protected injector: Injector,
        protected baseUrl: string,
        protected jsonDataToResourcesFn: (jsonData: any) => T,
       
    ){
        this.http = injector.get(HttpClient);
    }

    getAll(): Observable<T[]> {
        return this.http.get(this.baseUrl).pipe(
          map(this.jsonToResources.bind(this)),
          catchError(this.handleError)
        )
      }
    
      getById(id: number): Observable<T> {
        const url = `${this.baseUrl}/${id}`
        return this.http.get(url).pipe(
          map(this.jsonToResource.bind(this)),
          catchError(this.handleError)
        )
      }
    
      create(resource: T): Observable<T> {
        return this.http.post(this.baseUrl, resource).pipe(
          map(this.jsonToResource.bind(this)),
          catchError(this.handleError)
        )
      }
    
      update(resource: T): Observable<T> {
        const url = `${this.baseUrl}/${resource.id}`
        return this.http.put(url, resource).pipe(
          map(() => resource),
          catchError(this.handleError)
        )
      }
    
      delete(id: number): Observable<any> {
        const url = `${this.baseUrl}/${id}`;
        return this.http.delete(url).pipe(
          map(() => null),
          catchError(this.handleError)
        )
      }


      protected jsonToResources(jsonData: any[]): T[] {
        const resource: T[] = [];
        jsonData.forEach(
          element => resource.push(this.jsonDataToResourcesFn(element))
        );
        return resource;
      }
    
      protected jsonToResource(jsonData: any): T {
        return this.jsonDataToResourcesFn(jsonData);
      }
    
      protected handleError(error: any): Observable<any> {
         console.error('Error:', error);
         return throwError(error);
      }

}