import pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js"

describe('pull-stream', () => {
  it('should return a function when the first argument is a function', () => {
    const funcArg = () => {};
    const result = pull(funcArg);
    expect(result).toBeInstanceOf(Function);
  })
})