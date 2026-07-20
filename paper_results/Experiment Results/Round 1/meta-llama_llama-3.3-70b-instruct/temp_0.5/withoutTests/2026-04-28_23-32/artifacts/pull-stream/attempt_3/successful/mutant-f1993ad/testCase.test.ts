import prop from "../../../../../../../../../../../subject_repositories/pull-stream/util/prop.js";

describe('prop function', () => {
  it('should return a function when key is a regular expression', () => {
    const key = /test/;
    const result = prop(key);
    expect(typeof result).toBe('function');
    const data = 'this is a test string';
    expect(result(data)).toBe('test');
  });
});