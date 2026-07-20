import prop from "../../../../../../../../../../../subject_repositories/pull-stream/util/prop.js";

describe('prop function', () => {
  it('should return a function that extracts a match when key is a RegExp', () => {
    const key = /test/;
    key.exec = function(str) { return ['test']; };
    const data = 'test string';
    const extractor = prop(key);
    expect(typeof extractor).toBe('function');
    expect(extractor(data)).toBe('test');
  });
});