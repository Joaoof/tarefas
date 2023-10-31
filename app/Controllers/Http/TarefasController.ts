import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Tarefa from 'App/Models/Tarefa'
import TarefaValidator from 'App/Validators/TarefaValidator'

export default class TarefasController {
    public async store({ request, response }: HttpContextContract) {
        const body = await request.validate(TarefaValidator)
        
        const user = await Tarefa.create(body)

        console.log(user)
        

    }
}
