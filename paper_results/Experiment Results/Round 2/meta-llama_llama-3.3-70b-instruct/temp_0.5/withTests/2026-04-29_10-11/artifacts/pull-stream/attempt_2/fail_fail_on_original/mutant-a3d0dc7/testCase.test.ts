import { values } from '../../../../../../../../../../../subject_repositories/pull-stream/sources/values.js'

describe('values function', () => {
  it('should not abort when no abort signal is given and array is falsy', (done) => {
    const read = values(null, () => {})
    read(null, (end, data) => {
      expect(end).toBe(true)
      expect(data).toBeUndefined()
      done()
    })
  })
})