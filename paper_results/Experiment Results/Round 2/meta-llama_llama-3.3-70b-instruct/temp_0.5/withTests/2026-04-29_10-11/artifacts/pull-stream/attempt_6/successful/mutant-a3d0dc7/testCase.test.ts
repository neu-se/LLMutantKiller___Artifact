import values from '../../../../../../../../../../../subject_repositories/pull-stream/sources/values.js'

describe('values function', () => {
  it('should behave differently when no array is provided', (done) => {
    const read = values(null)
    let called = 0
    read(null, (end: any, data: any) => {
      expect(end).toBe(true)
      expect(data).toBeUndefined()
      called++
    })
    read(true, (end: any, data: any) => {
      expect(end).toBe(true)
      expect(data).toBeUndefined()
      called++
      expect(called).toBe(2)
      done()
    })
  })
})