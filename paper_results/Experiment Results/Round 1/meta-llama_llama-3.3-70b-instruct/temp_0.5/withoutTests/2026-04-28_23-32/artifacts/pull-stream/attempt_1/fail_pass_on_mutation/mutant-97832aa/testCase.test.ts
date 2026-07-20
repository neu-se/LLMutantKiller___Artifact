import { pull } from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js"

describe('pull function', () => {
  it('should throw an error when sink is null and source is an object', () => {
    expect(() => pull(null, { source: () => {}, sink: () => {} })).toThrowError()
  })
})