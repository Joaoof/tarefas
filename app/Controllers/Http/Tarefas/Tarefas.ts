import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import Tarefa from 'App/Models/Tarefa'
import TarefaValidator from 'App/Validators/Tarefas/TarefaValidator'
import TarefaCompletedValidator from 'App/Validators/Tarefas/TarefaCompletedValidator'

export default class TarefasController {
    public async store({ request, response, auth }: HttpContextContract) {
        const { user } = auth
        if (!user) return response.status(401).send('Usuário não autenticado')
        const body = await request.validate(TarefaValidator)

        const tarefa = await Tarefa.create({ ...body, userId: user.id })

        return response.created(tarefa)
    }

    public async index({ response }: HttpContextContract) {
        const user = await User.query().preload('tarefas').where('id', 1).firstOrFail()

        const tarefas = user.tarefas.map(({ id, tarefas, description, completed }) => ({
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
            const validatedData = await request.validate(TarefaCompletedValidator)
          
            const tarefa = await Tarefa.find(params.id)
          
            if (!tarefa) {
              return response.notFound({ error: 'Tarefa não encontrada' })
            }
          
            tarefa.merge(validatedData)
            await tarefa.save()
          
            const responseData = {
              tarefas: tarefa.tarefas,
              description: tarefa.description,
              completed: tarefa.completed
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

    public async getTrue({ response }: HttpContextContract) {
        const user = await Tarefa.query().select('tarefas', 'completed').where('completed', true).exec()

        const tarefas = user.map(({ tarefas, completed }) => {
            if (completed) {
                return tarefas
            }
        })

        return response.status(200).json({ tarefas_true: tarefas.map(item => item).toString() })
    }

    public async getFalse({ response }: HttpContextContract) {
        const user = await Tarefa.query().select('tarefas', 'completed').where('completed', false).exec()

        const tarefas = user.map(({ tarefas, completed }) => {
            if (!completed) {
                return tarefas
            }
        })

        return response.status(200).json({ tarefas_false: tarefas.map(item => item).toString() })

    }
}
