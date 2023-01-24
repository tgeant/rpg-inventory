import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { create, index, show, update, destroy } from './controller'
import { schema } from './model'
export Inventory, { schema } from './model'

const router = new Router()
const { name, weightMax } = schema.tree

/**
 * @api {post} /inventories Create inventory
 * @apiName CreateInventory
 * @apiGroup Inventory
 * @apiParam {String} name Inventory's name.
 * @apiParam {Number} weightMax Inventory's weightMax.
 * @apiSuccess {Object} inventory Inventory's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Inventory not found.
 */
router.post('/',
  body({ name, weightMax }),
  create)

/**
 * @api {get} /inventories Retrieve inventories
 * @apiName RetrieveInventories
 * @apiGroup Inventory
 * @apiUse listParams
 * @apiSuccess {Number} count Total amount of inventories.
 * @apiSuccess {Object[]} rows List of inventories.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 */
router.get('/',
  query(),
  index)

/**
 * @api {get} /inventories/:id Retrieve inventory
 * @apiName RetrieveInventory
 * @apiGroup Inventory
 * @apiSuccess {Object} inventory Inventory's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Inventory not found.
 */
router.get('/:id',
  show)

/**
 * @api {put} /inventories/:id Update inventory
 * @apiName UpdateInventory
 * @apiGroup Inventory
 * @apiParam {String} name Inventory's name.
 * @apiParam {Number} weightMax Inventory's weightMax.
 * @apiSuccess {Object} inventory Inventory's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Inventory not found.
 */
router.put('/:id',
  body({ name, weightMax }),
  update)

/**
 * @api {delete} /inventories/:id Delete inventory
 * @apiName DeleteInventory
 * @apiGroup Inventory
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Inventory not found.
 */
router.delete('/:id',
  destroy)

export default router
