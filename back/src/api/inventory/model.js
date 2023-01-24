import mongoose, { Schema } from 'mongoose'
import idValidator from 'mongoose-id-validator'
import mongooseKeywords from 'mongoose-keywords'

import { Item } from '../item'

const inventorySchema = new Schema({
  name: {
    type: String,
    required: true
  },
  weightMax: {
    type: Number,
    required: true
  }
}, {
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: (obj, ret) => { delete ret._id }
  }
})

inventorySchema.methods = {
  view (full) {
    const view = {
      // simple view
      id: this.id,
      name: this.name,
      weightMax: this.weightMax,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }

    return full ? {
      ...view
      // add properties for a full view
    } : view
  }
}

inventorySchema.pre('remove', function(next) {
  // EntityRef.find({ 'inventory': this.id }, (err,array) => { array.forEach((element)=>element.remove()) });
  Item.find({ 'inventory': this.id }, (err,array) => { array.forEach((element)=>element.remove()) });
  next();
});

inventorySchema.plugin(mongooseKeywords, {paths: ['name']})
inventorySchema.plugin(idValidator)
const model = mongoose.model('Inventory', inventorySchema)

export const schema = model.schema
export default model
