import prop from "../../../../../../../../../../../subject_repositories/pull-stream/util/prop.js";

describe('prop function', () => {
  it('should return the original key when key is not a string and does not have an exec method', () => {
    const key = {};
    expect(prop(key)).toBe(key);
  });
});