import prop from "../../../../../../../../../../../subject_repositories/pull-stream/util/prop.js";

describe('prop function', () => {
  it('should return the original key when key is an object with an exec method and is not a string, and also not an empty string', () => {
    const key = { exec: () => null, toString: () => 'test' };
    expect(prop(key)).toBe(key);
  });
});