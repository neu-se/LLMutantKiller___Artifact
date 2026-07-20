import { pull } from '../pull'

describe('pull function', () => {
  it('should handle function arguments correctly', () => {
    const read = pull(
      function (end: any, cb: any) {
        if (end) return cb(end)
        cb(null, 1)
      },
      function (data: any) {
        return data + 1
      }
    )

    read(null, function (end: any, data: any) {
      expect(end).toBe(null)
      expect(data).toBe(2)
    })
  })
})