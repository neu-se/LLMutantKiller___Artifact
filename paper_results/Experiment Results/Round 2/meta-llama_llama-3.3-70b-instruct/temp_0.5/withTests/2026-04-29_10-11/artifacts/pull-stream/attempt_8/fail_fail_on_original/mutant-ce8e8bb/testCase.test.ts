import { pull } from '../pull'

describe('pull function', () => {
  it('should handle function arguments correctly', () => {
    const source = () => {
      return (end: any, cb: any) => {
        if (end) return cb(end)
        cb(null, 1)
      }
    }
    const transform = (data: any) => data + 1
    const sink = (data: any) => {
      expect(data).toBe(2)
    }
    pull(source(), transform, sink)
  })
})