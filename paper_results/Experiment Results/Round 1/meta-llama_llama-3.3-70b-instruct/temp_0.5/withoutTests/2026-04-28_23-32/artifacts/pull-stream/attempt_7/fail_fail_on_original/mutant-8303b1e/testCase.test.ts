import prop from "../../../../../../../../../../../subject_repositories/pull-stream/util/prop.js";

describe('prop function', () => {
  it('should return a function when key is a string, and not return a function when key is an empty string with an exec method', () => {
    const key1 = 'test';
    const key2 = { exec: () => null, toString: () => '' };
    expect(typeof prop(key1)).toBe('function');
    expect(typeof prop(key2)).not.toBe('function');
  });
});