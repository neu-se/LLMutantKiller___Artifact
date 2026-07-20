import prop from "../../../../../../../../../../../subject_repositories/pull-stream/util/prop.js";

describe('prop function', () => {
  it('should return the key itself when key is an object without an exec function', () => {
    const key = { foo: 'bar' };
    expect(prop(key)).toBe(key);
    const key2 = { exec: () => null, toString: () => '' };
    expect(prop(key2)).not.toBe(key2);
  });
});