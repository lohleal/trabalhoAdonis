import { BaseSeeder } from '@adonisjs/lucid/seeders'
import Curso from '#models/curso'
import Aluno from '#models/aluno'

export default class extends BaseSeeder {
  async run() {
    const cursos = await Curso.all()

    for (const curso of cursos) {
      // Criar alunos para cada curso
      await Aluno.createMany([
        {
          nome: `Ana Luisa (${curso.nome})`,
          curso_id: curso.id,
        },
        {
          nome: `Luiz Eduardo (${curso.nome})`,
          curso_id: curso.id,
        },
        {
          nome: 'Fulano',
          curso_id: curso.id,
          email: 'fulano@email.com',
          cidade: 'SP',
          estado: 'SP',
          rua: 'Rua A',
          cpf: '123.456.789-09',
          nCasa: 123
        },
      ])
    }
  }
}
