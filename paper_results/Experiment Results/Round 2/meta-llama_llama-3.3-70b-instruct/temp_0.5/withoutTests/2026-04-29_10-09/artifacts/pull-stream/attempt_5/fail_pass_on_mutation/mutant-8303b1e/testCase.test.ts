import prop from "../../../../../../../../../../../subject_repositories/pull-stream/util/prop.js";

describe('prop function', () => {
  it('should return the key itself when key is not a string, object with exec function, or undefined', () => {
    const key = {};
    expect(prop(key)).toBe(key);
    const key2 = "";
    expect(prop(key2)).toBe(key2);
  });
});