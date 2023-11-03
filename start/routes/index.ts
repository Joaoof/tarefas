import Route from '@ioc:Adonis/Core/Route'
import './tarefas'
import './auth'
import './register'

Route.get('/', async () => {
    return { hello: 'world' }
  })