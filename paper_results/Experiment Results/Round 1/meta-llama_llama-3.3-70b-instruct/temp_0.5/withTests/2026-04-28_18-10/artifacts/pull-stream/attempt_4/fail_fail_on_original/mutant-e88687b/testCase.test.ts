import drain from '../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js'

describe('drain', () => {
  it('should handle function as error correctly', () => {
    const op = jest.fn(() => true)
    const done = jest.fn()
    const read = jest.fn((err, cb) => {
      cb(null, 'data')
    })
    drain(op, done)(read)
    expect(done).toHaveBeenCalledTimes(1)
    expect(op).toHaveBeenCalledTimes(1)
  })

  it('should handle non-function error incorrectly in mutated code', () => {
    const op = jest.fn(() => true)
    const done = jest.fn()
    const read = jest.fn((err, cb) => {
      cb(null, 'data')
    })
    drain(op, done)(read)
    const err = ""
    expect(() => drain(op, done)(err)).toThrow()
  })
})