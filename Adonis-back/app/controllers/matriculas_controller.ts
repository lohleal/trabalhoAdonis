import type { HttpContext } from '@adonisjs/core/http'
import Matricula from '#models/matricula'
import { createMatricula } from '#validators/matricula'
import MatriculaPolicy from '#policies/matricula_policy'
import logger from '@adonisjs/core/services/logger'

export default class MatriculasController {
  /**
   * Display a list of resource
   */
  async index({ response, auth, bouncer }: HttpContext) {
    try {
      // Usuário Autenticado
      const user = auth.getUserOrFail()
      // Verificar se o usuário pode listar posts
      if (await bouncer.with(MatriculaPolicy).denies('list')) {
        return response.forbidden({ message: 'Você não tem permissão para listar matriculas' })
      }
      // const matriculas = await Matricula.all()
      const matriculas = await Matricula.query().preload('aluno').preload('disciplina')
      return response.status(200).json({
        message: 'OK',
        data: matriculas,
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
  async create({}: HttpContext) {}

  /**
   * Handle form submission for the create action
   */
  async store({ request, response, auth, bouncer }: HttpContext) {
    const payload = await request.validateUsing(createMatricula)
    try {
      // Usuário Autenticado
      const user = auth.getUserOrFail()
      // Verificar se o usuário pode listar posts
      if (await bouncer.with(MatriculaPolicy).denies('create')) {
        return response.forbidden({ message: 'Você não tem permissão para listar matriculas' })
      }
      const matricula = await Matricula.create({
        ...payload,
      })
      return response.status(201).json({
        message: 'OK',
        data: matricula,
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
  async show({ params }: HttpContext) {}

  /**
   * Edit individual record
   */
  async edit({ params }: HttpContext) {}

  /**
   * Handle form submission for the edit action
   */
  async update({ params, request }: HttpContext) {}

  /**
   * Delete record
   */
  async destroy({ params, response, auth, bouncer }: HttpContext) {
    try {
      // Usuário Autenticado
      const user = auth.getUserOrFail()
      // Verificar se o usuário pode listar posts
      if (await bouncer.with(MatriculaPolicy).denies('delete')) {
        return response.forbidden({ message: 'Você não tem permissão para remover matriculas' })
      }

      const matricula = await Matricula.query().where('aluno_id', params.alunoId).where('disciplina_id', params.disciplinaId).firstOrFail()
      await matricula.delete()

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
