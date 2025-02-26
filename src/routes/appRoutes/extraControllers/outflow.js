const Expense = require('@/models/appModels/Expense');

const calculate = async (req, res) => {
  const expensesResult = await Expense.aggregate([
    {
      $group: {
        _id: null,
        total: { $sum: '$total' },
      },
    },
  ]);

  let totalOutflowAmount = 0;

  if (expensesResult[0] && expensesResult[0]?.total) {
    totalOutflowAmount += expensesResult[0].total;
  }

  return res.status(200).json({
    success: true,
    result: totalOutflowAmount,
    message: 'Successfully found all documents',
  });
};

module.exports = {
  calculate,
};
