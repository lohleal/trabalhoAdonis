import vine from '@vinejs/vine'

// Valida a criação dos alunos (create)
export const createAluno = vine.compile(
  vine.object({
    nome: vine.string().trim().minLength(2),
    email: vine.string().trim().email(),
    //curso_id: vine.number().positive().withoutDecimals(),
    cidade: vine.string().trim().minLength(2),
    estado: vine.string().trim().minLength(2),
    rua: vine.string().trim().minLength(1),
    cpf: vine.string().trim().minLength(1),
    nCasa: vine.number().positive().withoutDecimals(),
    senha: vine.string().minLength(1).trim(),
  })
)
// Valida a atualização dos alunos (update)
export const updateAluno = vine.compile(
  vine.object({
    nome: vine.string().trim().minLength(2).optional(),
    email: vine.string().trim().email().optional(),
    //curso_id: vine.number().positive().withoutDecimals().optional(),
    cidade: vine.string().trim().minLength(2).optional(),
    estado: vine.string().trim().minLength(2).optional(),
    rua: vine.string().trim().minLength(1).optional(),
    cpf: vine.string().trim().minLength(1).optional(),
    nCasa: vine.number().positive().withoutDecimals().optional(),
    
  })
)

