import factory from '@adonisjs/lucid/factories'
import Conta from '#models/conta'

export const ContaFactory = factory
  .define(Conta, async ({ faker }) => {
    return {}
  })
  .build()