import values from '../../../../../../../../../../../subject_repositories/pull-stream/sources/values.js'

describe('values function', () => {
  it('should not abort when no abort signal is given and array is falsy', (done) => {
    const read = values([1, 2, 3])
    read(null, (end, data) => {
      expect(end).toBeNull()
      expect(data).toBe(1)
      done()
    })
  })
})