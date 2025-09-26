import Aluno from '#models/aluno'
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
