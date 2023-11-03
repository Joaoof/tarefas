import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Tarefa from 'App/Models/Tarefa'
import TarefaValidator from 'App/Validators/Tarefas/TarefaValidator'


export default class TarefasController {
    public async store({ request, response }: HttpContextContract) {
        const body = await request.validate(TarefaValidator)

        const tarefa = await Tarefa.create(body)

        return response.created(tarefa)
    }

    public async index({ response }: HttpContextContract) {
        const tarefas = await Tarefa.all()
        return response.ok(tarefas)
    }

    public async show({ params }: HttpContextContract) {
        const tarefas = await Tarefa.find(params.id)

        return tarefas

    }

    public async update({ params, request, response }: HttpContextContract) {
        const tarefas = await Tarefa.find(params.id)

        if (!tarefas) {
            return response.notFound({ error: 'Tarefa não encontrada' })
        }

        const data = request.only(['tarefas', 'description'])

        await tarefas.merge(data).save()

        return response.ok(tarefas)
    }

    public async destroy({ response, params }: HttpContextContract) {
        const tarefas = await Tarefa.find(params.id)

        if (!tarefas) {
            return response.conflict({ error: 'Tarefa já excluída!'})
        } else {
            await tarefas?.delete()
            return response.ok({ error: 'Tarefa deletada com sucesso'})
        }


    }
}
