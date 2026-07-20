import prop from "../../../../../../../../../../../subject_repositories/pull-stream/util/prop.js";

describe('prop function', () => {
  it('should return the key when key is an empty string, and not try to execute it as a regex', () => {
    const key = "";
    const data = "test";
    expect(() => prop(key)(data)).not.toThrow();
  });
});