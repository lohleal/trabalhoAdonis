import Curso from '#models/curso'

export default class CursoService {
  static async listarCursos() {
    return await Curso.query().preload('disciplinas').preload('alunos')
  }

  static async criarCurso(payload: any) {
    return await Curso.create({ ...payload })
  }

  static async buscarCurso(id: number) {
    return await Curso.query().where('id', id).preload('disciplinas').preload('alunos').firstOrFail()
  }

  static async atualizarCurso(id: number, payload: any) {
    const curso = await Curso.findOrFail(id)
    await curso.merge({ ...payload }).save()
    return curso
  }

  static async deletarCurso(id: number) {
    const curso = await Curso.findOrFail(id)
    await curso.delete()
    return curso
  }
}
