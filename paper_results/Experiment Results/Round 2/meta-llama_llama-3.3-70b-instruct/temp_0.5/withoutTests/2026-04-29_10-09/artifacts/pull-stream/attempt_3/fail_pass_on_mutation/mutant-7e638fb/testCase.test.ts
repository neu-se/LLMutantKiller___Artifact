import prop from "../../../../../../../../../../../subject_repositories/pull-stream/util/prop.js";

describe('prop function', () => {
  it('should return the correct value when key is a string', () => {
    const data = { foo: 'bar' };
    const key = 'foo';
    expect(prop(key)(data)).toBe('bar');
  });
});