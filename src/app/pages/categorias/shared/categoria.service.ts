import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable, throwError} from 'rxjs'
import { map, catchError, flatMap } from 'rxjs/operators'

import { Categoria } from './categoria.model'

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  private baseUrl: string = "api/categorias";

  constructor(
    private http: HttpClient,
  ) { }

  getAll(): Observable<Categoria[]> {
    return this.http.get<Categoria[]>(this.baseUrl).pipe(
      catchError(this.handleError),
      map(this.jsonToCategorias)  
    )
  }

  getCategoriaById(id: string): Observable<Categoria> {
    const url = `${this.baseUrl}/${id}`
    return this.http.get(url).pipe(
      catchError(this.handleError),
      map(this.jsonToCategoria)
    )
  }

  create(categoria: Categoria): Observable<Categoria> {
    return this.http.post<Categoria>(this.baseUrl, categoria).pipe(
      catchError(this.handleError),
      map(this.jsonToCategoria)
    )
  }

  update(categoria: Categoria): Observable<Categoria> {
    const url = `${this.baseUrl}/${categoria.id}`
    return this.http.put<Categoria>(url, categoria).pipe(
      catchError(this.handleError),
      map(() => categoria)
    )
  }

  delete(id: number): Observable<any> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.delete(url).pipe(
      catchError(this.handleError),
      map(() => null)
    )
  }

  private jsonToCategorias(jsonData: any[]): Categoria[] {
    const categoria: Categoria[] = [];
    jsonData.forEach(element => categoria.push(element as Categoria));
    return categoria;
  }

  private jsonToCategoria(jsonData: any): Categoria {
    return jsonData as Categoria;
  }

  private handleError(error: any): Observable<any> {
     console.error('Error:', error);
     return throwError(error);
  }
}
