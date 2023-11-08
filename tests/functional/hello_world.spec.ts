import { test } from '@japa/runner'
import Tarefa from 'App/Models/Tarefa'

test('display welcome page', async ({ client }) => {
  const response = await client.get('/')

  response.assertStatus(200)
  response.assertBodyContains({ hello: 'world' })
})

// test('Login feito', async ({ client }) => {
//   await Tarefa.create({
//     tarefas: 'Teste',
//     description: 'Teste'
//   })

//   const response = await client.post('/tarefas').headers({
//     Authorization: 'Bearer Mg.e8CpjpyuQjIULzMt9gCo3Swl3oyr4TwhPJdD8HutJVl2xXdYWlROjV13R_mC',
//     Content: 'application/json'
//   }).send()

// response.assertStatus(201)
// })

