import vine from '@vinejs/vine'

// Valida a criação dos alunos (create)
export const createConta = vine.compile(
  vine.object({
    n_conta: vine.string(),
    n_agencia: vine.string(),
    saldo: vine.number().withoutDecimals(),
  })
)
// Valida a atualização dos alunos (update)
export const updateAluno = vine.compile(
  vine.object({
    n_conta: vine.string().optional(),
    n_agencia: vine.string().optional(),
    saldo: vine.number().withoutDecimals().optional(),
  })
)

