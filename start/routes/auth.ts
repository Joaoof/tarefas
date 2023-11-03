import Route from '@ioc:Adonis/Core/Route'


Route.post('/auth', 'Auth/Auth.store')
Route.delete('/delete', 'Auth/Auth.destroy')