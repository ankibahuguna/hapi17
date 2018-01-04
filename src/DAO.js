class DAO {
  constructor(model) {
    this.model = model;
  }

  insert(data) {
    return this.model.create(data);
  }

  insertMultiple(data) {
    return this.model.insertMultiple(data);
  }

  find(condition, projection, options) {
    return this.model.find(condition, projection, options).lean().exec();
  }

  findOne(condition, projection, options) {
    return this.model.findOne(condition, projection, options).lean().exec();
  }

  update(condition, dataToUpdate, options) {
    return this.model.update(condition, dataToUpdate, options);
  }

  removeOne(condition, options) {
    return this.model.findOneAndRemove(condition, options).lean().exec();
  }
}

module.exports = DAO;
