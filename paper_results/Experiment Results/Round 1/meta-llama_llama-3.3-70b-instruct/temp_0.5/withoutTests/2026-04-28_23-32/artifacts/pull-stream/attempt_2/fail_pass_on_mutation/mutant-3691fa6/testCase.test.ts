import prop from "../../../../../../../../../../../subject_repositories/pull-stream/util/prop.js";

describe('prop function', () => {
  it('should return the original key when key is not a string and does not have an exec function', () => {
    const key = {};
    const data = {};
    const extractor = prop(key);
    expect(extractor).toBe(key);
  });
});