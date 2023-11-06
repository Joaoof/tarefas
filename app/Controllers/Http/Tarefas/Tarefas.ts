import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import Tarefa from 'App/Models/Tarefa'
import TarefaValidator from 'App/Validators/Tarefas/TarefaValidator'

export default class TarefasController {
    public async store({ request, response, auth }: HttpContextContract) {
        const { user } = auth
        if(!user) return response.status(401).send('Usuário não autenticado')
        const body = await request.validate(TarefaValidator)

        const tarefa = await Tarefa.create({...body, userId: user.id})

        return response.created(tarefa)
    }

    public async index({ response }: HttpContextContract) {
        const user = await User.query().preload('tarefas').where('id', 1).firstOrFail()
      
        const tarefas = user.tarefas.map(({id, tarefas, description, completed }) => ({
            user: user.email,
            id,
            tarefas,
            description,
            completed: !!completed
          }))


        return response.ok(tarefas)
    }

    public async show({ params }: HttpContextContract) {
        const tarefas = await Tarefa.find(params.id)

        return tarefas

    }

    public async update({ params, request, response }: HttpContextContract) {
        const tarefa = await Tarefa.findOrFail(params.id)

        if (!tarefa) {
            return response.notFound({ error: 'Tarefa não encontrada' })
        }

        const { tarefas, description, completed } = request.only(['tarefas', 'description', 'completed'])

        tarefa.merge({ tarefas, description, completed })
        await tarefa.save()

        const responseData = {
            tarefas,
            description,
            completed
          }

        return response.ok(responseData)
    }

    public async destroy({ response, params }: HttpContextContract) {
        const tarefas = await Tarefa.find(params.id)

        if (!tarefas) {
            return response.conflict({ error: 'Tarefa já excluída!' })
        } else {
            await tarefas?.delete()
            return response.ok({ error: 'Tarefa deletada com sucesso' })
        }


    }

    public async get({ response }: HttpContextContract) {
        const tarefas = await Tarefa.query().select('id', 'tarefas', 'description', 'completed').where('completed', true).fetch()

        return response.ok(tarefas)
    }
}
