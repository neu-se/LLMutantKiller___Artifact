import { drain } from '../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js'

describe('drain', () => {
  it('should throw an error with a meaningful message when no done callback is supplied', () => {
    expect(() => drain(() => {}, undefined)).toThrowError('no done callback supplied')
  })
})