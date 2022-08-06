
import { Component, OnInit } from '@angular/core';
import { TarefaService } from './services/tarefa.service';
import { Tarefa } from './models/tarefa';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  Tarefa = {} as Tarefa;
  Tarefas: Tarefa[] | undefined;

  constructor(private TarefaService: TarefaService) {}

  ngOnInit() {
    this.get();
  }

  // defini se um Tarefaro será criado ou atualizado
  save(form: NgForm) {
    if (this.Tarefa.id !== undefined) {
      this.TarefaService.update(this.Tarefa).subscribe(() => {
        this.cleanForm(form);
      });
    } else {
      this.TarefaService.save(this.Tarefa).subscribe(() => {
        this.cleanForm(form);
      });
    }
  }

  // Chama o serviço para obtém todos os Tarefaros
  get() {
    this.TarefaService.get().subscribe((Tarefas: Tarefa[]) => {
      this.Tarefas = Tarefas;
    });
  }

  // deleta um Tarefaro
  delet(Tarefa: Tarefa) {
    this.TarefaService.delete(Tarefa).subscribe(() => {
      this.get();
    });
  }

  // copia o Tarefaro para ser editado.
  edit(Tarefa: Tarefa) {
    this.Tarefa = { ...Tarefa };
  }

  // limpa o formulario
  cleanForm(form: NgForm) {
    this.get();
    form.resetForm();
    this.Tarefa = {} as Tarefa;
  }


}
