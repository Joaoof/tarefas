import Route from '@ioc:Adonis/Core/Route'
import './tarefas'
import './auth'

Route.get('/', async () => {
    return { hello: 'world' }
  })