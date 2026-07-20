import pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js"

describe('pull-stream', () => {
  it('should only return a partial sink when the first argument is a function with length 1', () => {
    const funcArg = () => {};
    Object.defineProperty(funcArg, 'length', { value: 2 });
    const result = pull(funcArg);
    expect(typeof result).not.toBe('function');
    const funcArg2 = () => {};
    Object.defineProperty(funcArg2, 'length', { value: 1 });
    const result2 = pull(funcArg2);
    expect(typeof result2).toBe('function');
  })
})