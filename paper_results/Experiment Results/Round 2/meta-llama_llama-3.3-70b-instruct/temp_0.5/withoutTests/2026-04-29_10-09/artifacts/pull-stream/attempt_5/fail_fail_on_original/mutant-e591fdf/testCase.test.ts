import pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js"

describe('pull-stream', () => {
  it('should not return a partial sink when the first argument is not a function', () => {
    const nonFunctionArg = {};
    const result = pull(nonFunctionArg);
    expect(typeof result).not.toBe('function');
    const funcArg = () => {};
    funcArg.length = undefined;
    expect(() => pull(funcArg)).toThrow();
  })
})