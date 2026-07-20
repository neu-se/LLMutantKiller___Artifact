import prop from "../../../../../../../../../../../subject_repositories/pull-stream/util/prop.js";

describe('prop function', () => {
  it('should return the original key when key is an object without exec method and not a string', () => {
    const key = {};
    const data = {};
    expect(prop(key)(data)).toBe(key);
  });
});