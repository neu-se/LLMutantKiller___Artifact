import pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js"

describe('pull-stream', () => {
  it('should not return a partial sink when the first argument is not a function and has no length property', () => {
    const nonFunctionArg = {};
    expect(() => pull(nonFunctionArg)).not.toThrow();
    expect(pull(nonFunctionArg)).not.toBeInstanceOf(Function);
  })
})