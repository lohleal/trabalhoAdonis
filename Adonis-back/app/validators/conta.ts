import vine from '@vinejs/vine'

// Valida a criação dos alunos (create)
export const createConta = vine.compile(
  vine.object({
    n_conta: vine.number().positive().withoutDecimals(),
    n_agencia: vine.number().positive().withoutDecimals(),
    saldo: vine.number().withoutDecimals(),
  })
)
// Valida a atualização dos alunos (update)
export const updateAluno = vine.compile(
  vine.object({
    n_conta: vine.number().positive().withoutDecimals(),
    n_agencia: vine.number().positive().withoutDecimals(),
    saldo: vine.number().withoutDecimals(),
  })
)

