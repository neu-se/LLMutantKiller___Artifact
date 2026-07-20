import prop from "../../../../../../../../../../../subject_repositories/pull-stream/util/prop.js";

describe('prop function', () => {
  it('should return a function that extracts the matched value from the input data when a RegExp key is provided', () => {
    const key = /hello/;
    const data = 'hello world';
    const extractor = prop(key);
    expect(extractor(data)).not.toBeUndefined();
    expect(extractor(data)).not.toBeNull();
    expect(typeof extractor(data)).toBe('string');
  });
});