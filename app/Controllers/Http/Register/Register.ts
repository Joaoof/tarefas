import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database'
import User from 'App/Models/User'
import LoginValidator from 'App/Validators/Auth/LoginValidator'

export default class RegisterController {
  public async store({ request, response }: HttpContextContract) {
    const data = await request.validate(LoginValidator)

    const user = await User.create(data)

    return response.created(user)
  }
  public async destroy({ response, params }: HttpContextContract) {
    const user = await User.find(params.id)

    if (!user) {
      return response.notFound({ error: 'Usuário não encontrado' })
    }

    await user.delete()

    return response.ok({ message: 'Usuário apagado com sucesso' })
  }

  public async index({ response }: HttpContextContract) {
    console.log('passoui')
    const users = await User.all()
    return response.ok(users)   
  }
}
