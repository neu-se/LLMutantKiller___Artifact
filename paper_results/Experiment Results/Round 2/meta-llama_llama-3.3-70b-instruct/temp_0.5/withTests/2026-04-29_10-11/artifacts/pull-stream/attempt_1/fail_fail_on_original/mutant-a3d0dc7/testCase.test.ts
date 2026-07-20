import { values } from '../../../../../../../../../../../subject_repositories/pull-stream/sources/values.js'

describe('values function', () => {
  it('should not abort when no abort signal is given and array is falsy', (done) => {
    const read = values(null)
    read(null, (err, data) => {
      expect(err).toBeUndefined()
      expect(data).toBeUndefined()
      done()
    })
  })
})