exports.migrate = (result) => {
  return { ...result._doc, hash: result?.hash?.toUpperCase()?.trim() };
};
