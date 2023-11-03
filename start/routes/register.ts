import Route from '@ioc:Adonis/Core/Route'

Route.post('/register', 'Register/Register.store')
Route.delete('/register/delete/:id', 'Register/Register.destroy')