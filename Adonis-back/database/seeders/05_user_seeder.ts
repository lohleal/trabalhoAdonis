import { BaseSeeder } from '@adonisjs/lucid/seeders'
import User from '#models/user'

export default class extends BaseSeeder {
  async run() {

    await User.createMany([
      {
        fullName: 'Gerente',
        email: 'gerente@gmail.com',
        password: '1',
        papel_id: 1,
      },
      {
        fullName: 'Cliente',
        email: 'cliente@gmail.com',
        password: '2',
        papel_id: 2,
      },
      
    ])
  }
}
