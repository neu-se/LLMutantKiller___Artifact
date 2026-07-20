const prop = require("../../../../../../../../../../../subject_repositories/pull-stream/util/prop.js");

describe('prop function with object key', () => {
  it('should return the key object when it is not a regex', () => {
    const objKey = { test: 'value' };
    const result = prop(objKey);
    expect(result).toBe(objKey);
  });
});