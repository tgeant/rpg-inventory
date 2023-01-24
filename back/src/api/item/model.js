import mongoose, { Schema } from 'mongoose'
import idValidator from 'mongoose-id-validator'
import mongooseKeywords from 'mongoose-keywords'

const itemSchema = new Schema({
  itemNumber: {
    type: Number,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  weight: {
    type: Number,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  inventory: {
    type: Schema.ObjectId,
    ref: 'Inventory',
    required: true
  }
}, {
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: (obj, ret) => { delete ret._id }
  }
})

itemSchema.methods = {
  view (full) {
    const view = {
      // simple view
      id: this.id,
      itemNumber: this.itemNumber,
      name: this.name,
      description: this.description,
      weight: this.weight,
      price: this.price,
      inventory: this.inventory  ? this.inventory : {"id": "Deleted"},
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }

    return full ? {
      ...view
      // add properties for a full view
    } : view
  }
}

itemSchema.pre('remove', function(next) {
  // EntityRef.find({ 'item': this.id }, (err,array) => { array.forEach((element)=>element.remove()) });
  next();
});

itemSchema.plugin(mongooseKeywords, {paths: ['name']})
itemSchema.plugin(idValidator)
const model = mongoose.model('Item', itemSchema)

export const schema = model.schema
export default model
