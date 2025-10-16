import type { HttpContext } from '@adonisjs/core/http'
import { createAluno, updateAluno } from '#validators/aluno'
import AlunoPolicy from '#policies/aluno_policy'
import AlunoService from '#services/aluno_service'

export default class AlunosController {
  async index({ response, auth, bouncer }: HttpContext) {
    try {
      const user = auth.getUserOrFail()
      if (await bouncer.with(AlunoPolicy).denies('list')) {
        return response.forbidden({ message: 'Você não tem permissão para listar alunos' })
      }

      const alunos = await AlunoService.listarAlunos()
      return response.status(200).json({ message: 'OK', data: alunos })
    } catch (error) {
      return response.status(500).json({ message: 'ERROR' })
    }
  }

  async create({ auth, bouncer, response }: HttpContext) {
    try {
      const user = auth.getUserOrFail()
      if (await bouncer.with(AlunoPolicy).denies('create')) {
        return response.forbidden({ message: 'Você não tem permissão para criar aluno' })
      }

      //const cursos = await AlunoService.listarCursos()
      return response.status(200).json({ message: 'OK' })
    } catch (error) {
      return response.status(500).json({ message: 'ERROR' })
    }
  }

  async store({ request, response, auth, bouncer }: HttpContext) {
    const payload = await request.validateUsing(createAluno)
    try {
      const user = auth.getUserOrFail()
      if (await bouncer.with(AlunoPolicy).denies('create')) {
        return response.forbidden({ message: 'Você não tem permissão para criar alunos' })
      }
      

      const aluno = await AlunoService.criarAluno(payload)
      return response.status(201).json({ message: 'OK', data: aluno })
    } catch (error) {
  console.error(error)
  return response.status(500).json({ message: error.message || 'ERROR' })
}

  }

  async show({ params, response, auth, bouncer }: HttpContext) {
    try {
      const user = auth.getUserOrFail()
      if (await bouncer.with(AlunoPolicy).denies('create')) {
        return response.forbidden({ message: 'Você não tem permissão para ver aluno' })
      }

      const aluno = await AlunoService.buscarAluno(params.id)
      return response.status(200).json({ message: 'OK', data: aluno })
    } catch (error) {
      return response.status(500).json({ message: 'ERROR' })
    }
  }

  async edit({ params, auth, bouncer, response }: HttpContext) {
    try {
      const user = auth.getUserOrFail()
      if (await bouncer.with(AlunoPolicy).denies('create')) {
        return response.forbidden({ message: 'Você não tem permissão para alterar aluno' })
      }

      //const cursos = await AlunoService.listarCursos()
      return response.status(200).json({ message: 'OK' })
    } catch (error) {
      return response.status(500).json({ message: 'ERROR' })
    }
  }

  async update({ params, request, response, auth, bouncer }: HttpContext) {
    const payload = await request.validateUsing(updateAluno)
    try {
      const user = auth.getUserOrFail()
      if (await bouncer.with(AlunoPolicy).denies('create')) {
        return response.forbidden({ message: 'Você não tem permissão para alterar aluno' })
      }

      const aluno = await AlunoService.atualizarAluno(params.id, payload)
      return response.status(200).json({ message: 'OK', data: aluno })
    } catch (error) {
      return response.status(500).json({ message: 'ERROR' })
    }
  }

  async destroy({ params, response, auth, bouncer }: HttpContext) {
    try {
      const user = auth.getUserOrFail()
      if (await bouncer.with(AlunoPolicy).denies('create')) {
        return response.forbidden({ message: 'Você não tem permissão para remover aluno' })
      }

      await AlunoService.deletarAluno(params.id)
      return response.status(200).json({ message: 'OK' })
    } catch (error) {
      return response.status(500).json({ message: 'ERROR' })
    }
  }
}
