import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  alunos: any[] = [];
  aluno = { nome: '', email: '', curso: '' };

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.listar();
  }

  listar() {
    this.http.get<any[]>('http://localhost:8080/api/alunos').subscribe(dados => this.alunos = dados);
  }

  salvar() {
    this.http.post('http://localhost:8080/api/alunos', this.aluno).subscribe(() => {
      this.aluno = { nome: '', email: '', curso: '' };
      this.listar();
    });
  }

  deletar(id: number) {
    this.http.delete('http://localhost:8080/api/alunos/' + id).subscribe(() => this.listar());
  }
}