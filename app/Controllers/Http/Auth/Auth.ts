import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class AuthController {
  public async store({ auth, request, response }: HttpContextContract) {
    const { email, password } = request.only(['email', 'password'])

    const token = await auth.use('api').attempt(email, password, {
      expiresIn: '30 days',
    })

    return response.ok(token)
  }

  public async destroy({ auth }: HttpContextContract) { 
    await auth.logout()
  }
}
