const mongoose = require('mongoose');

const create = async (Model, req, res) => {
  // Creating a new document in the collection

  const result = await new Model({
    ...req.body,
  }).save();

  // Returning successfull response
  return res.status(200).json({
    success: true,
    result,
    message: 'Successfully Created the document in Model ',
  });
};

module.exports = create;
