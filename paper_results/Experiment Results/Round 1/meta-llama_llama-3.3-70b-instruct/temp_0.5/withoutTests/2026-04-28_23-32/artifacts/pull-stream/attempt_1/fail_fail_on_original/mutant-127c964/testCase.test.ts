import { values } from "../../../../../../../../../../../subject_repositories/pull-stream/sources/values.js"

describe('values function', () => {
  it('should handle arrays correctly', () => {
    const array = [1, 2, 3, 4, 5]
    const result: any[] = []
    const cb = (err: any, value: any) => {
      if (err) {
        result.push(err)
      } else {
        result.push(value)
      }
    }
    const stream = values(array)
    stream(null, cb)
    stream(null, cb)
    stream(null, cb)
    stream(null, cb)
    stream(null, cb)
    stream(null, cb)
    expect(result).toEqual([1, 2, 3, 4, 5, true])
  })
})