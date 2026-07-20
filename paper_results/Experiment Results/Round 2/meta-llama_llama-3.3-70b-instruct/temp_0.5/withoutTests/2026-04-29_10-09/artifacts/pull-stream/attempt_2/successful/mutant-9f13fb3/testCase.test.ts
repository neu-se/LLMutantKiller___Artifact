import prop from "../../../../../../../../../../../subject_repositories/pull-stream/util/prop.js";

describe('prop function', () => {
  it('returns a function when key is a string', () => {
    const key = 'test';
    const data = { test: 'value' };
    const result = prop(key);
    expect(typeof result).toBe('function');
    expect(result(data)).toBe('value');
  });
});