import Conta from '#models/conta'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  async run() {
    await Conta.createMany([
      {
        n_conta: '1010-1',
        n_agencia: '1010-0',
        saldo: 1000000,
      },
    ])
  }
}