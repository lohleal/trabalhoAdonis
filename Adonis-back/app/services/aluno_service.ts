import Aluno from '#models/aluno'
import conta from '#models/conta'
import Conta from '#models/conta'
import User from '#models/user'
import ContaService from '#services/conta_service' // Importando o serviço de conta
import hash from '@adonisjs/core/services/hash'

export default class AlunoService {
  static async listarAlunos() {
    return await Aluno.query()
  }

  /*static async criarAluno(payload: any) {
    const {
      nome,
      email,
      senha,
      cpf,
      cidade,
      estado,
      rua,
      n_casa,
    } = payload

    console.log('Senha recebida no backend:', senha)

    // Cria o usuário para login
    const user = await User.create({
      fullName: nome,
      email,
      password: await hash.make(senha),
      papel_id: 2, // aluno
    })

    // Criação da conta antes de associar ao aluno
    const numeroConta = ContaService.gerarNumeroConta()
    const numeroAgencia = ContaService.gerarNumeroAgencia()

    
    // Cria o aluno, associando a conta criada
    const aluno = await Aluno.create({
      nome,
      email,
      cpf,
      cidade,
      estado,
      rua,
      n_casa,
      user_id: user.id,   // associa o usuário
      conta_id: conta.id, // associa a conta
      //userId: user.id, // Associa o usuário
      
    })
    
    // Cria a conta
    const conta = await Conta.create({
      n_conta: numeroConta,
      n_agencia: numeroAgencia,
      saldo: 0, // saldo inicial
      aluno_id: aluno.id,
    })
    return aluno
  }*/

  static async criarAluno(payload: any) {
    const {
      nome,
      email,
      senha,
      cpf,
      cidade,
      estado,
      rua,
      n_casa,
    } = payload

    // 1. Cria o usuário
    const user = await User.create({
      fullName: nome,
      email,
      password: await hash.make(senha),
      papel_id: 2, // aluno
    })

    // 2. Cria o aluno (sem conta_id)
    const aluno = await Aluno.create({
      nome,
      email,
      cpf,
      cidade,
      estado,
      rua,
      n_casa,
      user_id: user.id,
    })

    // 3. Gera dados e cria a conta, associando ao aluno
    const numeroConta = ContaService.gerarNumeroConta()
    const numeroAgencia = ContaService.gerarNumeroAgencia()

    await Conta.create({
      n_conta: numeroConta,
      n_agencia: numeroAgencia,
      saldo: 0,
      aluno_id: aluno.id,  // aqui você relaciona a conta ao aluno
    })

    await aluno.load('conta')

    return {
      aluno, 
      conta
    }
  }



  static async buscarAluno(id: number) {
    return await Aluno.query()
      .where('id', id)
      .firstOrFail()
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
