import values from "../../../../../../../../../../../subject_repositories/pull-stream/sources/values.js"

describe('values function', () => {
  it('should handle objects and arrays correctly', () => {
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
    expect(resultObject.length).toBe(6)
    expect(resultObject.slice(0, 5)).toEqual([1, 2, 3, 4, 5])
    // In the mutated code, the object should always be treated as an array
    // and its values should be returned in the order they were inserted,
    // which means it will not return true at the end.
    expect(resultObject[5]).not.toBe(true)
  })
})