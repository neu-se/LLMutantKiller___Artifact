import { pull } from '../../../pull.js'

describe('pull function', () => {
  it('should handle function arguments correctly', () => {
    const read = pull(
      (end: any, cb: any) => {
        if (end) return cb(end)
        cb(null, 1)
      },
      (data: any) => data + 1,
      (data: any) => {
        expect(data).toBe(2)
      }
    )
  })
})