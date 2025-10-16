import Conta from '#models/conta'

export default class ContaService {
  static gerarNumeroConta(): string {
    const numero = Math.floor(Math.random() * 10000); // 4 dígitos
    const digitoVerificador = Math.floor(Math.random() * 10); // 1 dígito aleatório
    return `${numero}-${digitoVerificador}`;
  }

  static gerarNumeroAgencia(): string {
    const numero = Math.floor(Math.random() * 10000); // 4 dígitos
    const digitoVerificador = Math.floor(Math.random() * 10); // 1 dígito aleatório
    return `${numero}-${digitoVerificador}`;
  }

  static async criarConta() {
    const numeroConta = this.gerarNumeroConta()
    const numeroAgencia = this.gerarNumeroAgencia()

    // Criação da conta com o número gerado aleatoriamente
    const conta = await Conta.create({
      n_conta: numeroConta,
      n_agencia: numeroAgencia,
      saldo: 0, // ou qualquer saldo inicial
    })

    return conta
  }
}
