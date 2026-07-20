import prop from "../../../../../../../../../../../subject_repositories/pull-stream/util/prop.js";

describe('prop function', () => {
  it('should return the key when key is an object without an exec method and not an empty string', () => {
    const key = { foo: 'bar' };
    expect(prop(key)).toBe(key);
  });
});