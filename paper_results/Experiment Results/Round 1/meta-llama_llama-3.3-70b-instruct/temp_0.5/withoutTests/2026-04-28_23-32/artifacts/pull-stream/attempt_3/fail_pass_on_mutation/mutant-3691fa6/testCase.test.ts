import prop from "../../../../../../../../../../../subject_repositories/pull-stream/util/prop.js";

describe('prop function', () => {
  it('should return the original key when key is not an object', () => {
    const key = 123;
    const data = {};
    const extractor = prop(key);
    expect(extractor).toBe(key);
  });
});