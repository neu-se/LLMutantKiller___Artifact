import prop from "../../../../../../../../../../../subject_repositories/pull-stream/util/prop.js";

describe('prop function', () => {
  it('should handle regex correctly', () => {
    const regex = /test/;
    const data = 'test string';
    const property = prop(regex);
    expect(property(data)).toBe('test');
  });
});