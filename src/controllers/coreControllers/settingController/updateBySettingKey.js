const mongoose = require('mongoose');

const Model = mongoose.model('Setting');

// const updateBySettingKey = async (req, res) => {
//   const settingKey = req.params.settingKey || undefined;

//   if (!settingKey) {
//     return res.status(202).json({
//       success: false,
//       result: null,
//       message: 'No settingKey provided ',
//     });
//   }
//   const { settingValue } = req.body;

//   if (!settingValue) {
//     return res.status(202).json({
//       success: false,
//       result: null,
//       message: 'No settingValue provided ',
//     });
//   }
//   const result = await Model.findOneAndUpdate(
//     { settingKey },
//     {
//       settingValue,
//     },
//     {
//       new: true, // return the new result instead of the old one
//       runValidators: true,
//     }
//   ).exec();
//   if (!result) {
//     return res.status(404).json({
//       success: false,
//       result: null,
//       message: 'No document found by this settingKey: ' + settingKey,
//     });
//   } else {
//     return res.status(200).json({
//       success: true,
//       result,
//       message: 'we update this document by this settingKey: ' + settingKey,
//     });
//   }
// };
const updateBySettingKey = async (req, res) => {
  const settingKey = req.params.settingKey || undefined;

  if (!settingKey) {
    return res.status(202).json({
      success: false,
      result: null,
      message: 'No settingKey provided',
    });
  }

  // For file uploads, the file path should be in req.file
  const settingValue = req.file ? req.file.path : req.body.settingValue;

  if (!settingValue) {
    return res.status(202).json({
      success: false,
      result: null,
      message: 'No settingValue provided',
    });
  }

  try {
    const result = await Model.findOneAndUpdate(
      { settingKey },
      { settingValue },
      {
        new: true,
        runValidators: true,
      }
    ).exec();

    if (!result) {
      return res.status(404).json({
        success: false,
        result: null,
        message: 'No document found by this settingKey: ' + settingKey,
      });
    }

    return res.status(200).json({
      success: true,
      result,
      message: 'Document updated successfully for settingKey: ' + settingKey,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      result: null,
      message: error.message,
    });
  }
};

module.exports = updateBySettingKey;
