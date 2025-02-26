const mongoose = require('mongoose');

const update = async (Model, req, res) => {
  // Find document by id and updates with the required fields
  req.body.removed = false;
  const result = await Model.findOneAndUpdate({ _id: req.params.id, removed: false }, req.body, {
    new: true,
    runValidators: true,
  }).exec();

  return res.status(200).json({
    success: true,
    result: result,
    message: 'Unit updated successfuly',
  });
};

module.exports = update;
