import pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js"

describe('pull-stream', () => {
  it('should not return a partial sink when the first argument is not a function', () => {
    const nonFunctionArg = {};
    expect(pull(nonFunctionArg)).not.toBeInstanceOf(Function);
    const stringArg = "test";
    expect(pull(stringArg)).not.toBeInstanceOf(Function);
    const numberArg = 123;
    expect(pull(numberArg)).not.toBeInstanceOf(Function);
    const booleanArg = true;
    expect(pull(booleanArg)).not.toBeInstanceOf(Function);
  })
})