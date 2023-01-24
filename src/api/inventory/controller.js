import { success, notFound } from '../../services/response/'
import { Inventory } from '.'

export const create = ({ bodymen: { body } }, res, next) =>
  Inventory.create(body)
    .then((inventory) => inventory.view(true))
    .then(success(res, 201))
    .catch(next)

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  Inventory.count(query)
    .then(count => Inventory.find(query, select, cursor)
      .then((inventories) => ({
        count,
        rows: inventories.map((inventory) => inventory.view())
      }))
    )
    .then(success(res))
    .catch(next)

export const show = ({ params }, res, next) =>
  Inventory.findById(params.id)
    .then(notFound(res))
    .then((inventory) => inventory ? inventory.view() : null)
    .then(success(res))
    .catch(next)

export const update = ({ bodymen: { body }, params }, res, next) =>
  Inventory.findById(params.id)
    .then(notFound(res))
    .then((inventory) => inventory ? Object.assign(inventory, body).save() : null)
    .then((inventory) => inventory ? inventory.view(true) : null)
    .then(success(res))
    .catch(next)

export const destroy = ({ params }, res, next) =>
  Inventory.findById(params.id)
    .then(notFound(res))
    .then((inventory) => inventory ? inventory.remove() : null)
    .then(success(res, 204))
    .catch(next)
