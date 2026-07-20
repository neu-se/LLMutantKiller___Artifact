import prop from "../../../../../../../../../../../subject_repositories/pull-stream/util/prop.js";

describe('prop function', () => {
  it('should return a function that extracts a property from an object when key is a string', () => {
    const key = 'test';
    const data = { test: 'value' };
    const result = prop(key);
    expect(typeof result).toBe('function');
    expect(result(data)).toBe('value');
  });
});