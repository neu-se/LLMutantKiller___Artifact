import values from "../../../../../../../../../../../subject_repositories/pull-stream/sources/values.js"

describe('values function', () => {
  it('should handle objects and arrays correctly', () => {
    const array = [1, 2, 3, 4, 5]
    const object = { a: 1, b: 2, c: 3, d: 4, e: 5 }
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
    expect(resultObject.length).toBe(6)
    expect(resultObject.slice(0, 5)).toEqual([1, 2, 3, 4, 5])
  })
})