const prop = require("../../../../../../../../../../../subject_repositories/pull-stream/util/prop.js");

describe('prop function with non-regex object', () => {
  it('should return the key itself when it is an object without exec method', () => {
    const obj = { a: 1 };
    const result = prop(obj);
    expect(result).toBe(obj);
  });
});