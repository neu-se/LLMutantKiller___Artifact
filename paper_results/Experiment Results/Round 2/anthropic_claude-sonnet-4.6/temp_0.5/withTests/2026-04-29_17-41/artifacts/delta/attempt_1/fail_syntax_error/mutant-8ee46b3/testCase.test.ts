let transformedData: Op['retain'] =
  typeof otherData === 'object' && otherData !== null
    ? otherData
    : /* something using the condition */