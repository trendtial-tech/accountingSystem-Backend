const mongoose = require('mongoose');

const QuoteModel = mongoose.model('Quote');
const InvoiceModel = mongoose.model('Invoice');
const People = mongoose.model('People');
const Company = mongoose.model('Company');

const remove = async (Model, req, res) => {
  // cannot delete client it it have one invoice or quotes:
  // check if client have invoice or quotes:
  const { id } = req.params;

  let result = await Model.findOneAndDelete({
    _id: id,
    removed: false,
  }).exec();

  if (!result) {
    return res.status(404).json({
      success: false,
      result: null,
      message: 'No client found by this id: ' + id,
    });
  }

  return res.status(200).json({
    success: true,
    result: null,
    message: 'Successfully Deleted the client by id: ' + id,
  });
};
module.exports = remove;
