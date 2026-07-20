import prop from "../../../../../../../../../../../subject_repositories/pull-stream/util/prop.js";

describe('prop function', () => {
  it('should return a string when key is a RegExp and matches the data', () => {
    const data = 'hello world';
    const key = /hello/;
    const result = prop(key)(data);
    expect(typeof result).toBe('string');
  });
});