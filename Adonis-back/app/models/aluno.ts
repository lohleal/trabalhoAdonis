import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo, hasOne } from '@adonisjs/lucid/orm'
//import Curso from './curso.js'
//import Disciplina from './disciplina.js'
import User from './user.js'
import type { BelongsTo, HasOne } from '@adonisjs/lucid/types/relations'
import Conta from './conta.js'

export default class Aluno extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare nome: string

  @column()
  declare email: string


  @column()
  declare cidade: string

  @column()
  declare estado: string

  @column()
  declare rua: string

  @column()
  declare n_casa: number

  @column()
  declare cpf: string

  @column()
  declare user_id: number

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  // Relacionamentos
  @hasOne(() => Conta, { foreignKey: 'aluno_id' })
  declare conta: HasOne<typeof Conta>

  //@manyToMany(() => Disciplina, { pivotTable: 'matriculas' })
  //declare disciplinas: ManyToMany<typeof Disciplina>

  @belongsTo(() => User)
  public user!: BelongsTo<typeof User>
  
  //conta_id: number

}
