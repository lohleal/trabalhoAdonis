import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import Aluno from './aluno.js'

export default class Conta extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare n_conta: string

  @column()
  declare n_agencia: string

  @column()
  declare saldo: number

  @column()
  declare aluno_id: number

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  //Relacionamentos
  @belongsTo(() => Aluno, { foreignKey: 'aluno_id' })
  declare alunos: BelongsTo<typeof Aluno>
}