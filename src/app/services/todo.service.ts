import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Todo } from '../models/Todo';

const httpOptions = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json'
    })
};

@Injectable({
    providedIn: 'root'
})

export class TodoService {
    todosUrl: string = 'https://my-json-server.typicode.com/nevets915/tododb/todo'; // JSON Placeholder URL to my repo/tododb

    todosLimit: string = '?_limit=5'; // String for limiting results from JSON Placeholder

    constructor(private http: HttpClient) { }

    // Get Todos
    getTodos(): Observable<Todo[]> {
        return this.http.get<Todo[]>(`${this.todosUrl}${this.todosLimit}`);
    }

    // Toggle Completed
    toggleCompleted(todo: Todo): Observable<any> {
        const url = `${this.todosUrl}/${todo.id}`;
        return this.http.put(url, todo, httpOptions);
    }

    // Delete Todo
    deleteTodo(todo: Todo): Observable<Todo> {
        const url = `${this.todosUrl}/${todo.id}`;
        return this.http.delete<Todo>(url, httpOptions);
    }

    // Add Todo
    addTodo(todo: Todo): Observable<Todo> {
        return this.http.post<Todo>(this.todosUrl, todo, httpOptions);
    }
}
