import { drain } from '../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js'

describe('drain', () => {
  it('should handle function as error correctly', () => {
    const op = () => true
    const done = jest.fn()
    const read = (err: any, cb: any) => {
      cb(null, 'data')
    }
    const sink = drain(op, done)
    sink(read)
    expect(done).toHaveBeenCalledTimes(1)
  })

  it('should handle non-function error incorrectly in mutated code', () => {
    const op = () => true
    const done = jest.fn()
    const read = (err: any, cb: any) => {
      cb(null, 'data')
    }
    const sink = drain(op, done)
    const err = ""
    expect(() => sink(err)).toThrowError()
  })
})