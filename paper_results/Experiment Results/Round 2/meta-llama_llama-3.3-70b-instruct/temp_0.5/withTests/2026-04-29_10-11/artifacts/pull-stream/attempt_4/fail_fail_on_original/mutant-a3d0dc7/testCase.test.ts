import values from '../../../../../../../../../../../subject_repositories/pull-stream/sources/values.js'

describe('values function', () => {
  it('should behave differently when no array is provided', (done) => {
    const read = values(null)
    read(null, (end, data) => {
      expect(end).toBe(true)
      expect(data).toBeUndefined()
      done()
    })
    read(null, (end, data) => {
      expect(end).toBe(true)
      expect(data).toBeUndefined()
      done()
    })
  })
})