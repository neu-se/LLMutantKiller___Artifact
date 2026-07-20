import prop from "../../../../../../../../../../../subject_repositories/pull-stream/util/prop.js";

describe('prop function', () => {
  it('should not match a string with an object key', () => {
    const key = {};
    const data = 'test';
    const func = prop(key);
    expect(func).not.toBeInstanceOf(Function);
    expect(func).toBe(key);
  });
});