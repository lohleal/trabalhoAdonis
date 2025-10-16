import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'contas'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('n_conta').notNullable()
      table.string('n_agencia').notNullable()
      table.integer('saldo').unsigned().notNullable()
      table.integer('aluno_id').unsigned().references('id').inTable('alunos')
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
