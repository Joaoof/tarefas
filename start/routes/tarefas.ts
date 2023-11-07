/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'

Route.post('/tarefas', 'Tarefas/Tarefas.store').middleware('auth')
Route.get('/listar', 'Tarefas/Tarefas.index')
Route.get('/listar/tarefas/true', 'Tarefas/Tarefas.getTrue')
Route.get('/listar/tarefas/false', 'Tarefas/Tarefas.getFalse')
Route.get('/listar/:id', 'Tarefas/Tarefas.show')
Route.put('/listar/:id', 'Tarefas/Tarefas.update').middleware('auth')
Route.delete('/listar/:id', 'Tarefas/Tarefas.destroy').middleware('auth')
