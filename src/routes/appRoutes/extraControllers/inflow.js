const FullCash = require('@/models/appModels/FullCash');
const Installment = require('@/models/appModels/Installment');
const Rental = require('@/models/appModels/Rental');

const calculate = async (req, res) => {
  const fullCashResult = await FullCash.aggregate([
    {
      $addFields: {
        calculatedField: {
          $subtract: [
            '$totalAmount',
            { $multiply: ['$totalAmount', { $divide: ['$discount', 100] }] },
          ],
        },
      },
    },
    {
      $group: {
        _id: null,
        total: { $sum: '$calculatedField' },
      },
    },
  ]);

  const installmentResult = await Installment.aggregate([
    {
      $lookup: {
        from: 'units',
        localField: 'unit',
        foreignField: '_id',
        as: 'refData',
      },
    },
    {
      $unwind: '$refData',
    },
    {
      $addFields: {
        calculatedField: {
          $multiply: ['$refData.totalPrice', { $divide: ['$downPaymentPercent', 100] }],
        },
      },
    },
    {
      $group: {
        _id: null,
        total: { $sum: '$calculatedField' },
      },
    },
  ]);

  const rentalResult = await Rental.aggregate([
    {
      $group: {
        _id: null,
        total: { $sum: '$totalAmount' },
      },
    },
  ]);

  let totalInflowAmount = 0;

  if (fullCashResult[0] && fullCashResult[0]?.total) {
    totalInflowAmount += fullCashResult[0].total;
  }
  if (installmentResult[0] && installmentResult[0]?.total) {
    totalInflowAmount += installmentResult[0].total;
  }
  if (rentalResult[0] && rentalResult[0]?.total) {
    totalInflowAmount += rentalResult[0].total;
  }

  return res.status(200).json({
    success: true,
    result: totalInflowAmount,
    message: 'Successfully found all documents',
  });
};

module.exports = {
  calculate,
};
