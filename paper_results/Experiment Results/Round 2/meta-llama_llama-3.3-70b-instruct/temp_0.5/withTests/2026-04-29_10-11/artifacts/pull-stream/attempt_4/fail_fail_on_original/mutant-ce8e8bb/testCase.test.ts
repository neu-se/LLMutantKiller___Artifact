import { pull } from '../../pull.js'

describe('pull function', () => {
  it('should handle function arguments correctly', () => {
    const read = pull(
      function (end: any, cb: any) {
        if (end) return cb(end)
        cb(null, 1)
      },
      function (data: any) {
        return data + 1
      },
      function (data: any) {
        expect(data).toBe(2)
      }
    )
  })
})