const prop = require("../../../../../../../../../../../subject_repositories/pull-stream/util/prop.js");

describe('prop function with object key', () => {
  it('should return the key itself when key is a plain object without exec method', () => {
    const objectKey = { foo: 'bar' };
    const result = prop(objectKey);
    expect(result).toBe(objectKey);
  });
});