import { pull } from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js"

describe('pull function', () => {
  it('should throw an error when called with a partial sink more than once', () => {
    const read = () => {}
    const sink = () => {}
    const partialSink = pull(sink)
    expect(() => partialSink(read)).not.toThrow()
    expect(() => partialSink(read)).toThrow(TypeError)
  })
})