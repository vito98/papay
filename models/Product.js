const assert = require("assert");
const { shapeIntMongooseObjectId } = require("../lib/config");
const Definer = require("../lib/mistake");
const ProductModel = require("../schema/product.model");

class Product {
  constructor() {
    this.productModel = ProductModel;
  }

  async addNewProductData() {
    // try {
    //   data.restaurant_mb_id = shapeIntMongooseObjectId(member._id);
    //   console.log(data);
    //   const new_product = new this.productModel(data);
    //   const result = await new_product.save();
    //   assert.ok(result, Definer.product_err1);
    //   return result;
    // } catch (err) {
    //   throw err;
    // }
  }

  async updateChosenProduct(id, updated_data, mb_id) {
    try {
      id = shapeIntMongooseObjectId(id);
      mb_id = shapeIntMongooseObjectId(mb_id);

      const result = await this.productModel
        .findOneAndUpdate({ _id: id, restaurant_mb_id: mb_id }, updated_data, {
          runValidators: true,
          lean: true,
          returnDocument: "after",
        })
        .exec();

      assert.ok(result, Definer.general_err1);
      return result;
    } catch (err) {
      throw err;
    }
  }
}

module.exports = Product;
