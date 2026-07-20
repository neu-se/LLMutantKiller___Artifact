import prop from "../../../../../../../../../../../subject_repositories/pull-stream/util/prop.js";

describe('prop function', () => {
  it('should return the key itself when key is an empty string', () => {
    const key = "";
    expect(prop(key)).toBe(key);
  });
});