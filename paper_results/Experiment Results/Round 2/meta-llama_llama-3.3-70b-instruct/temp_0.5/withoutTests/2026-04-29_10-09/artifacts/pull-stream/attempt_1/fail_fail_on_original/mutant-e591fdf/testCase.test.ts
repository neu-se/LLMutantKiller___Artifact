import { pull } from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js"

describe('pull-stream', () => {
  it('should only return a partial sink when the first argument is a function', () => {
    const nonFunctionArg = {};
    const result = pull(nonFunctionArg);
    expect(result).not.toBeInstanceOf(Function);
  })
})