import prop from "../../../../../../../../../../../subject_repositories/pull-stream/util/prop.js";

describe('prop function', () => {
  it('should return the property value when key is a RegExp object', () => {
    const key = /test/;
    const data = 'test string';
    expect(prop(key)(data)).toBe('test');
  });
});