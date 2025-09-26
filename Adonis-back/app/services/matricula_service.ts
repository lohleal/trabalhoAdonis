import Matricula from '#models/matricula'

export default class MatriculaService {
  static async listarMatriculas() {
    return await Matricula.query().preload('aluno').preload('disciplina')
  }

  static async criarMatricula(payload: any) {
    return await Matricula.create({ ...payload })
  }

  static async deletarMatricula(alunoId: number, disciplinaId: number) {
    const matricula = await Matricula.query()
      .where('aluno_id', alunoId)
      .where('disciplina_id', disciplinaId)
      .firstOrFail()
    await matricula.delete()
    return matricula
  }
}
