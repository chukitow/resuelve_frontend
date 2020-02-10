export const mapMovementData = (data) => {
  return {
    ...data,
    records: data.records.map(record => ({
      ...record,
      amount_converted: record.amount / 100,
      currency: 'MXN'
    }))
  };
};

export const convertAndMap = ({
  movement,
  collection,
  rates
}) => {
  return collection.map((record) => {
    if(record.uid === movement.uid) {
      return {
        ...movement,
        amount_converted: movement.currency === 'MXN' ?
                          (movement.amount / 100) * rates.mxn2usd :
                          (movement.amount / 100),
        currency: movement.currency === 'MXN' ? 'USD' : 'MXN'
      }
    }
    else {
      return record;
    }
  })
}
