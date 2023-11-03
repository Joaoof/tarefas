import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import LoginValidator from 'App/Validators/Auth/LoginValidator'

export default class AuthController {
  public async store({request, response}: HttpContextContract) {
    const data = await request.validate(LoginValidator)

    const user = await User.create(data)

    return response.created(user)
  }
  public async destroy({ auth }: HttpContextContract) {
    await auth.logout()
  }
}
