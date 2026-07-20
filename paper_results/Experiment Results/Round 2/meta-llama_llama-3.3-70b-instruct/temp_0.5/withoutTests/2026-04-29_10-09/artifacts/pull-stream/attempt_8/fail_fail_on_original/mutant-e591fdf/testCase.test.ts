import pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js"

describe('pull-stream', () => {
  it('should not return a partial sink when the first argument is not a function', () => {
    const obj = {};
    const result = pull(obj);
    expect(typeof result).not.toBe('function');
    const func = () => {};
    Object.defineProperty(func, 'length', { value: undefined });
    const result2 = pull(func);
    expect(typeof result2).not.toBe('function');
  })
})