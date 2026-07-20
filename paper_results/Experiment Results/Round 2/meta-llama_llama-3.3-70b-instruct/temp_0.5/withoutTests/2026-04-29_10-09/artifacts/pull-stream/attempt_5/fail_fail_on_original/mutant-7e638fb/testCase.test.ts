import prop from "../../../../../../../../../../../subject_repositories/pull-stream/util/prop.js";

describe('prop function', () => {
  it('should return undefined when key is an object without exec method and not a string', () => {
    const key = { test: 'object' };
    const data = {};
    const result = prop(key);
    expect(typeof result).toBe('function');
    expect(result(data)).toBeUndefined();
  });
});