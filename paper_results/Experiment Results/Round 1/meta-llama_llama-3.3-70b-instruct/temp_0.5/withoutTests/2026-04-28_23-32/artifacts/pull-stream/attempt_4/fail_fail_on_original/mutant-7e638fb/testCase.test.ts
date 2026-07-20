import * as propModule from "../../../../../../../../../../../subject_repositories/pull-stream/util/prop.js";

describe('prop function', () => {
  it('should return the original key when key is an object with exec function', () => {
    const key = /test/;
    const data = "test string";
    const result = propModule.default(key)({ data });
    expect(result).toBe("test");
  });
});