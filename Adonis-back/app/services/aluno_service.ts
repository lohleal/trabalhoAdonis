import Aluno from '#models/aluno'
//import Curso from '#models/curso'
import User from '#models/user'
import hash from '@adonisjs/core/services/hash'

export default class AlunoService {
  static async listarAlunos() {
    return await Aluno.query()
    // Sem preload de curso ou disciplinas
  }
  

  static async criarAluno(payload: any) {
    const {
      nome,
      email,
      senha,
      cpf,
      //curso_id,
      cidade,
      estado,
      rua,
      nCasa,
    } = payload

    console.log('Senha recebida no backend:', senha) 

    // Cria o usuário para login
    const user = await User.create({
      fullName: nome,
      email,
      password: await hash.make(senha),
      papel_id: 2, // aluno
    })

    // Cria o aluno
    const aluno = await Aluno.create({
      nome,
      email,
      cpf,
      //curso_id,
      cidade,
      estado,
      rua,
      nCasa,
      userId: user.id, // se tiver relação com usuário
    })

    return aluno
  }

  static async buscarAluno(id: number) {
    return await Aluno.query()
      .where('id', id)
      .firstOrFail()
  }

  // static async listarCursos() {
  //   return await Curso.all()
  // }

  static async atualizarAluno(id: number, payload: any) {
    const aluno = await Aluno.findOrFail(id)
    await aluno.merge({ ...payload }).save()
    return aluno
  }

  static async deletarAluno(id: number) {
    const aluno = await Aluno.findOrFail(id)
    await aluno.delete()
    return aluno
  }
}



/*import Aluno from '#models/aluno'
import Curso from '#models/curso'

export default class AlunoService {
  static async listarAlunos() {
    return await Aluno.query().preload('curso').preload('disciplinas')
  }

  static async criarAluno(payload: any) {
    return await Aluno.create({ ...payload })
  }

  static async buscarAluno(id: number) {
    return await Aluno.query().where('id', id).preload('curso').preload('disciplinas').firstOrFail()
  }

  static async listarCursos() {
    return await Curso.all()
  }

  static async atualizarAluno(id: number, payload: any) {
    const aluno = await Aluno.findOrFail(id)
    await aluno.merge({ ...payload }).save()
    return aluno
  }

  static async deletarAluno(id: number) {
    const aluno = await Aluno.findOrFail(id)
    await aluno.delete()
    return aluno
  }
}
*/