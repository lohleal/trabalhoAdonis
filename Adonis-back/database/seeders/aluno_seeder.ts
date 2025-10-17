import Aluno from '#models/aluno'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  async run() {
    await Aluno.createMany([
          {
            nome: 'helo',
            email: 'heloisa.dleal@gmail.com',
            cidade: 'Matinhos',
            estado: 'Paraná',
            rua: 'Marino',
            n_casa: 382,
            cpf: '113.464.129-01',
          },
          {
            nome: 'milly',
            email: 'kamilly@gmail.com',
            cidade: 'Matinhos',
            estado: 'Paraná',
            rua: 'flores',
            n_casa: 348,
            cpf: '113.464.129-01',
          },
        ])
  }
}
