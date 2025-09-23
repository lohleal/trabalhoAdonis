import type { HttpContext } from '@adonisjs/core/http'
import Curso from '#models/curso'
import { createCurso, updateCurso } from '#validators/curso'
import CursoPolicy from '#policies/curso_policy'
import logger from '@adonisjs/core/services/logger'

export default class CursosController {
  /**
   * Display a list of resource
   */
  async index({ auth, bouncer, response }: HttpContext) {
    try {
      // Usuário Autenticado
      const user = auth.getUserOrFail()
      // Verificar se o usuário pode listar posts
      if (await bouncer.with(CursoPolicy).denies('list')) {
        return response.forbidden({ message: 'Você não tem permissão para listar curso' })
      }

      // const cursos = await Curso.all()
      const cursos = await Curso.query().preload('disciplinas').preload('alunos')

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
   * Display form to create a new record
   */
  async create({}: HttpContext) {}

  /**
   * Handle form submission for the create action
   */
  async store({ auth, bouncer, request, response }: HttpContext) {
    const payload = await request.validateUsing(createCurso)
    try {
      // Usuário Autenticado
      const user = auth.getUserOrFail()
      // Verificar se o usuário pode listar posts
      if (await bouncer.with(CursoPolicy).denies('create')) {
        return response.forbidden({ message: 'Você não tem permissão para criar curso' })
      }

      const curso = await Curso.create({
        ...payload,
      })
      return response.status(201).json({
        message: 'OK',
        data: curso,
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
  async show({ auth, bouncer, params, response }: HttpContext) {
    try {
      // Usuário Autenticado
      const user = auth.getUserOrFail()
      // Verificar se o usuário pode listar posts
      if (await bouncer.with(CursoPolicy).denies('view')) {
        return response.forbidden({ message: 'Você não tem permissão para ver curso' })
      }

      // const curso = await Curso.findOrFail(params.id)
      const curso = await Curso.query().where('id', params.id).preload('disciplinas').preload('alunos').firstOrFail();
      return response.status(200).json({
        message: 'OK',
        data: curso,
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
  async edit({ params }: HttpContext) {}

  /**
   * Handle form submission for the edit action
   */
  async update({ auth, bouncer, params, request, response }: HttpContext) {
    const payload = await request.validateUsing(updateCurso)
    try {
      // Usuário Autenticado
      const user = auth.getUserOrFail()
      // Verificar se o usuário pode listar posts
      if (await bouncer.with(CursoPolicy).denies('edit')) {
        return response.forbidden({ message: 'Você não tem permissão para alterar curso' })
      }

      const curso = await Curso.findOrFail(params.id)
      await curso.merge({ ...payload }).save()

      return response.status(200).json({
        message: 'OK',
        data: curso,
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
  async destroy({ auth, bouncer, params, response }: HttpContext) {
    try {
      // Usuário Autenticado
      const user = auth.getUserOrFail()
      // Verificar se o usuário pode listar posts
      if (await bouncer.with(CursoPolicy).denies('delete')) {
        return response.forbidden({ message: 'Você não tem permissão para remover curso' })
      }

      const curso = await Curso.findOrFail(params.id)
      await curso.delete()

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
