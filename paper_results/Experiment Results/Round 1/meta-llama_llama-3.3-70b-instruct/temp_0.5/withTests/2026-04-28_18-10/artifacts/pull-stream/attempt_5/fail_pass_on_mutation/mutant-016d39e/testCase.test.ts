import { drain } from '../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js'

describe('drain', () => {
  it('should throw an error when drain is called with no arguments', () => {
    expect(() => drain()).toThrowError()
  })
})