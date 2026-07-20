import prop from "../../../../../../../../../../../subject_repositories/pull-stream/util/prop.js";

describe('prop function', () => {
  it('should not throw an error when key is an empty string', () => {
    const key = "";
    expect(() => prop(key)).not.toThrow();
  });
});