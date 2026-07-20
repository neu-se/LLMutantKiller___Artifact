import values from "../../../../../../../../../../../subject_repositories/pull-stream/sources/values.js"

describe('values function', () => {
  it('should handle objects and arrays correctly', () => {
    const array = [1, 2, 3, 4, 5]
    const object = {0: 1, 1: 2, 2: 3, 3: 4, 4: 5, length: 5}
    const resultArray: any[] = []
    const resultObject: any[] = []
    const cbArray = (err: any, value: any) => {
      if (err) {
        resultArray.push(err)
      } else {
        resultArray.push(value)
      }
    }
    const cbObject = (err: any, value: any) => {
      if (err) {
        resultObject.push(err)
      } else {
        resultObject.push(value)
      }
    }
    const streamArray = values(array)
    const streamObject = values(object)
    streamArray(null, cbArray)
    streamArray(null, cbArray)
    streamArray(null, cbArray)
    streamArray(null, cbArray)
    streamArray(null, cbArray)
    streamArray(null, cbArray)
    streamObject(null, cbObject)
    streamObject(null, cbObject)
    streamObject(null, cbObject)
    streamObject(null, cbObject)
    streamObject(null, cbObject)
    streamObject(null, cbObject)
    expect(resultArray).toEqual([1, 2, 3, 4, 5, true])
    expect(resultObject).toEqual([1, 2, 3, 4, 5, true])
    // In the mutated code, the object should always be treated as an array
    // and its values should be returned in the order they were inserted,
    // which means it will return true at the end for an object with a length property.
    const objectWithoutLength = {a: 1, b: 2, c: 3, d: 4, e: 5}
    const resultObjectWithoutLength: any[] = []
    const cbObjectWithoutLength = (err: any, value: any) => {
      if (err) {
        resultObjectWithoutLength.push(err)
      } else {
        resultObjectWithoutLength.push(value)
      }
    }
    const streamObjectWithoutLength = values(objectWithoutLength)
    streamObjectWithoutLength(null, cbObjectWithoutLength)
    streamObjectWithoutLength(null, cbObjectWithoutLength)
    streamObjectWithoutLength(null, cbObjectWithoutLength)
    streamObjectWithoutLength(null, cbObjectWithoutLength)
    streamObjectWithoutLength(null, cbObjectWithoutLength)
    streamObjectWithoutLength(null, cbObjectWithoutLength)
    expect(resultObjectWithoutLength).toEqual([1, 2, 3, 4, 5, true])
  })
})