import pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js"

describe('pull-stream', () => {
  it('should return a partial sink only when the first argument is a function with length 1', () => {
    const func = () => {};
    const result = pull(func);
    expect(typeof result).toBe('function');
    const obj = {};
    obj.length = 1;
    const result2 = pull(obj);
    expect(typeof result2).not.toBe('function');
  })
})