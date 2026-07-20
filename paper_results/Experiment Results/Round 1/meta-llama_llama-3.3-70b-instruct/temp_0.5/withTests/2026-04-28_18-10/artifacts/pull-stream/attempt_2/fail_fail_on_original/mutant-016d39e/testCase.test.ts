import { drain } from '../../../sinks/drain.js'

describe('drain', () => {
  it('should throw an error with a meaningful message when no done callback is supplied and an error occurs', () => {
    const sink = drain(() => {}, undefined)
    const error = new Error('Test error')
    sink.abort(error)
    expect(() => { throw error }).toThrowError('Test error')
  })
})