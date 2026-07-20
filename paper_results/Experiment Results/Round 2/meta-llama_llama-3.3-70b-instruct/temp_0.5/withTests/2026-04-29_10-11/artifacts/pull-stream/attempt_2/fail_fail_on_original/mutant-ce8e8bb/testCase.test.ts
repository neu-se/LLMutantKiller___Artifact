import { pull } from '../../../../../../../../subject_repositories/pull-stream/pull.js'

describe('pull function', () => {
  it('should handle function arguments correctly', () => {
    const read = pull(
      function (end, cb) {
        if (end) return cb(end)
        cb(null, 1)
      },
      function (data) {
        return data + 1
      }
    )

    read(null, function (end, data) {
      expect(end).toBe(null)
      expect(data).toBe(2)
    })
  })
})