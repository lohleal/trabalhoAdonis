import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo, manyToMany } from '@adonisjs/lucid/orm'
import Curso from './curso.js'
import Disciplina from './disciplina.js'
import type { BelongsTo, ManyToMany } from '@adonisjs/lucid/types/relations'

export default class Aluno extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare nome: string

  @column()
  declare email: string

  @column()
  declare curso_id: number

  @column()
  declare cidade: string

  @column()
  declare estado: string

  @column()
  declare rua: string

  @column()
  declare nCasa: number

  @column()
  declare cpf: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  // Relacionamentos
  @belongsTo(() => Curso, { foreignKey: 'curso_id' })
  declare curso: BelongsTo<typeof Curso>

  @manyToMany(() => Disciplina, { pivotTable: 'matriculas' })
  declare disciplinas: ManyToMany<typeof Disciplina>
}
