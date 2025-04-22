import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {path: 'categorias', loadChildren: './pages/categorias/categorias.module#CategoriasModule'},
  {path: 'lancamentos', loadChildren: './pages/entradas/entradas.module#EntradasModule'},
  {path: 'relatorios', loadChildren: './pages/relatorios/relatorios.module#RelatoriosModule'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
