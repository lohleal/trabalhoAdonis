import { DateTime } from 'luxon'
import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class Conta extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare n_conta: number

  @column()
  declare n_agencia: number

  @column()
  declare saldo: number

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}