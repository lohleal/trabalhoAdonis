import type { HttpContext } from '@adonisjs/core/http'
import { errors } from '@adonisjs/core'
import Aluno from '#models/aluno'
import Curso from '#models/curso'
import { createAluno, updateAluno } from '#validators/aluno'
import AlunoPolicy from '#policies/aluno_policy'
import logger from '@adonisjs/core/services/logger'

export default class AlunosController {
  /**
   * Display a list of resource
   */
  async index({ response, auth, bouncer }: HttpContext) {
    try {
      // Usuário Autenticado
      const user = auth.getUserOrFail()
      // Verificar se o usuário pode listar posts
      if (await bouncer.with(AlunoPolicy).denies('list')) {
        return response.forbidden({ message: 'Você não tem permissão para listar alunos' })
      }
      // const alunos = await Aluno.all()
      const alunos = await Aluno.query().preload('curso').preload('disciplinas')
      return response.status(200).json({
        message: 'OK',
        data: alunos,
      })
    } catch (error) {
      return response.status(500).json({
        message: 'ERROR',
      })
    }
  }

  /**
   * Display form to create a new record
   */
  async create({ auth, bouncer, response }: HttpContext) {
    try {
      // Usuário Autenticado
      const user = auth.getUserOrFail()
      // Verificar se o usuário pode listar posts
      if (await bouncer.with(AlunoPolicy).denies('create')) {
        return response.forbidden({ message: 'Você não tem permissão para criar aluno' })
      }

      const cursos = await Curso.all()

      return response.status(200).json({
        message: 'OK',
        data: cursos,
      })
    } catch (error) {
      return response.status(500).json({
        message: 'ERROR',
      })
    }
  }

  /**
   * Handle form submission for the create action
   */
  async store({ request, response, auth, bouncer }: HttpContext) {
    const payload = await request.validateUsing(createAluno)
    try {
      // Usuário Autenticado
      const user = auth.getUserOrFail()
      // Verificar se o usuário pode listar posts
      if (await bouncer.with(AlunoPolicy).denies('create')) {
        return response.forbidden({ message: 'Você não tem permissão para criar alunos' })
      }

      const aluno = await Aluno.create({
        ...payload,
      })
      return response.status(201).json({
        message: 'OK',
        data: aluno,
      })
    } catch (error) {
      return response.status(500).json({
        message: 'ERROR',
      })
    }
  }

  /**
   * Show individual record
   */
  async show({ params, response, auth, bouncer }: HttpContext) {
    try {
      // Usuário Autenticado
      const user = auth.getUserOrFail()
      // Verificar se o usuário pode listar posts
      if (await bouncer.with(AlunoPolicy).denies('create')) {
        return response.forbidden({ message: 'Você não tem permissão para ver aluno' })
      }
      // const aluno = await Aluno.findOrFail(params.id)
      const aluno = await Aluno.query().where('id', params.id).preload('curso').preload('disciplinas').firstOrFail();
      return response.status(200).json({
        message: 'OK',
        data: aluno,
      })
    } catch (error) {
      return response.status(500).json({
        message: 'ERROR',
      })
    }
  }

  /**
   * Edit individual record
   */
  async edit({ params, auth, bouncer, response }: HttpContext) {
    try {
      // Usuário Autenticado
      const user = auth.getUserOrFail()
      // Verificar se o usuário pode listar posts
      if (await bouncer.with(AlunoPolicy).denies('create')) {
        return response.forbidden({ message: 'Você não tem permissão para alterar aluno' })
      }

      const cursos = await Curso.all()

      return response.status(200).json({
        message: 'OK',
        data: cursos,
      })
    } catch (error) {
      return response.status(500).json({
        message: 'ERROR',
      })
    }
  }

  /**
   * Handle form submission for the edit action
   */
  async update({ params, request, response, auth, bouncer }: HttpContext) {
    const payload = await request.validateUsing(updateAluno)
    try {
      // Usuário Autenticado
      const user = auth.getUserOrFail()
      // Verificar se o usuário pode listar posts
      if (await bouncer.with(AlunoPolicy).denies('create')) {
        return response.forbidden({ message: 'Você não tem permissão para alterar aluno' })
      }

      const aluno = await Aluno.findOrFail(params.id)
      await aluno.merge({ ...payload }).save()

      return response.status(200).json({
        message: 'OK',
        data: aluno,
      })
    } catch (error) {
      return response.status(500).json({
        message: 'ERROR',
      })
    }
  }

  /**
   * Delete record
   */
  async destroy({ params, response, auth, bouncer }: HttpContext) {
    try {
      // Usuário Autenticado
      const user = auth.getUserOrFail()
      // Verificar se o usuário pode listar posts
      if (await bouncer.with(AlunoPolicy).denies('create')) {
        return response.forbidden({ message: 'Você não tem permissão para remover aluno' })
      }
      const aluno = await Aluno.findOrFail(params.id)
      await aluno.delete()

      return response.status(200).json({
        message: 'OK',
      })
    } catch (error) {
      return response.status(500).json({
        message: 'ERROR',
      })
    }
  }
}
