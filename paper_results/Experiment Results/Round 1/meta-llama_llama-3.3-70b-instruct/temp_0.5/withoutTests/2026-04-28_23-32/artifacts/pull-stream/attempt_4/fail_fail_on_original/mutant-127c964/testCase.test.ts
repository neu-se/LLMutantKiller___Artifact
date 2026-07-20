import values from "../../../../../../../../../../../subject_repositories/pull-stream/sources/values.js"

describe('values function', () => {
  it('should handle objects and arrays correctly', () => {
    const array = [1, 2, 3, 4, 5]
    const resultArray: any[] = []
    const cbArray = (err: any, value: any) => {
      if (err) {
        resultArray.push(err)
      } else {
        resultArray.push(value)
      }
    }
    const streamArray = values(array)
    streamArray(null, cbArray)
    streamArray(null, cbArray)
    streamArray(null, cbArray)
    streamArray(null, cbArray)
    streamArray(null, cbArray)
    streamArray(null, cbArray)
    expect(resultArray).toEqual([1, 2, 3, 4, 5, true])
    const object = { a: 1, b: 2, c: 3, d: 4, e: 5 }
    const resultObject: any[] = []
    const cbObject = (err: any, value: any) => {
      if (err) {
        resultObject.push(err)
      } else {
        resultObject.push(value)
      }
    }
    const streamObject = values(object)
    streamObject(null, cbObject)
    streamObject(null, cbObject)
    streamObject(null, cbObject)
    streamObject(null, cbObject)
    streamObject(null, cbObject)
    streamObject(null, cbObject)
    // In the original code, the object should be treated as an array
    // and its values should be returned in the order they were inserted.
    // But in the mutated code, the object should be treated as an array
    // and its values should be returned in the order they were inserted,
    // which means it will not return true at the end.
    expect(resultObject).not.toEqual([1, 2, 3, 4, 5, true])
  })
})