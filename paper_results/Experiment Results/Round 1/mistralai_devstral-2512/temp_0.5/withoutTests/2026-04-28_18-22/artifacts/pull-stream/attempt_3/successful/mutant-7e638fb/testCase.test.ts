const prop = require("../../../../../../../../../../../subject_repositories/pull-stream/util/prop.js");

describe('prop function with non-regex object key', () => {
  it('should return the key itself when it is an object without exec method', () => {
    const objectKey = { foo: 'bar' };
    const result = prop(objectKey);
    expect(result).toBe(objectKey);
  });
});