import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable, throwError} from 'rxjs'
import { map, catchError, flatMap } from 'rxjs/operators'

import { Entrada } from './entrada.model'

@Injectable({
  providedIn: 'root'
})
export class EntradaService {

  private baseUrl: string = "api/entradas";

  constructor(
    private http: HttpClient,
  ) { }

  getAll(): Observable<Entrada[]> {
    return this.http.get<Entrada[]>(this.baseUrl).pipe(
      catchError(this.handleError),
      map(this.jsonToEntradas)  
    )
  }

  getEntradaById(id: number): Observable<Entrada> {
    const url = `${this.baseUrl}/${id}`
    return this.http.get(url).pipe(
      catchError(this.handleError),
      map(this.jsonToEntrada)
    )
  }

  create(entrada: Entrada): Observable<Entrada> {
    return this.http.post<Entrada>(this.baseUrl, entrada).pipe(
      catchError(this.handleError),
      map(this.jsonToEntrada)
    )
  }

  update(entrada: Entrada): Observable<Entrada> {
    const url = `${this.baseUrl}/${entrada.id}`
    return this.http.put<Entrada>(url, entrada).pipe(
      catchError(this.handleError),
      map(() => entrada)
    )
  }

  delete(id: number): Observable<any> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.delete(url).pipe(
      catchError(this.handleError),
      map(() => null)
    )
  }

  private jsonToEntradas(jsonData: any[]): Entrada[] {
    const entrada: Entrada[] = [];
    jsonData.forEach(element => entrada.push(element as Entrada));
    return entrada;
  }

  private jsonToEntrada(jsonData: any): Entrada {
    return jsonData as Entrada;
  }

  private handleError(error: any): Observable<any> {
     console.error('Error:', error);
     return throwError(error);
  }
}
