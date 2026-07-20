import prop from "../../../../../../../../../../../subject_repositories/pull-stream/util/prop.js";

describe('prop function', () => {
  it('should correctly handle non-regexp objects', () => {
    const data = { foo: 'bar' };
    const key = {};
    const propFunction = prop(key);
    expect(propFunction).toBe(key);
  });
});