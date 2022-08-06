import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { Tarefa } from '../models/tarefa';

@Injectable({
  providedIn: 'root'
})

export class TarefaService {

  url = 'http://localhost:3000/Tarefas'; // api rest fake

  // injetando o HttpClient
  constructor(private httpClient: HttpClient) { }

  // Headers
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }

  // Obtem todas as Tarefas
  get(): Observable<Tarefa[]> {
    return this.httpClient.get<Tarefa[]>(this.url)
      .pipe(
        retry(2),
        catchError(this.handleError))
  }

  // salva uma Tarefa
  save(Tarefa: Tarefa): Observable<Tarefa> {
    return this.httpClient.post<Tarefa>(this.url, JSON.stringify(Tarefa), this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  // utualiza uma Tarefa
  update(Tarefa: Tarefa): Observable<Tarefa> {
    return this.httpClient.put<Tarefa>(this.url + '/' + Tarefa.id, JSON.stringify(Tarefa), this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }

  // deleta uma Tarefa
  delete(Tarefa: Tarefa) {
    return this.httpClient.delete<Tarefa>(this.url + '/' + Tarefa.id, this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }

  // Manipulação de erros
  handleError(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Erro ocorreu no lado do client
      errorMessage = error.error.message;
    } else {
      // Erro ocorreu no lado do servidor
      errorMessage = `Código do erro: ${error.status}, ` + `menssagem: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  };

}