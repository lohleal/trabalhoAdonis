import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'alunos'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('nome')
      table.string('email')
      table.string('cpf')
      table.string('cidade')
      table.string('estado')
      table.string('rua')
      table.integer('n_casa').unsigned()
      //table.integer('curso_id').unsigned().references('id').inTable('cursos')
      table.timestamp('created_at')
      table.timestamp('updated_at')


      // coluna user_id como chave estrangeira
      table.integer('user_id').unsigned().references('id').inTable('users').onDelete('CASCADE')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}