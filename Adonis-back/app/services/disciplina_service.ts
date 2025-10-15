// import Disciplina from '#models/disciplina'
// import Curso from '#models/curso'

// export default class DisciplinaService {
//   static async listarDisciplinas() {
//     return await Disciplina.query().preload('curso').preload('alunos')
//   }

//   static async listarCursos() {
//     return await Curso.all()
//   }

//   static async criarDisciplina(payload: any) {
//     return await Disciplina.create({ ...payload })
//   }

//   static async buscarDisciplina(id: number) {
//     return await Disciplina.query().where('id', id).preload('curso').preload('alunos').firstOrFail()
//   }

//   static async atualizarDisciplina(id: number, payload: any) {
//     const disciplina = await Disciplina.findOrFail(id)
//     await disciplina.merge({ ...payload }).save()
//     return disciplina
//   }

//   static async deletarDisciplina(id: number) {
//     const disciplina = await Disciplina.findOrFail(id)
//     await disciplina.delete()
//     return disciplina
//   }
// }
