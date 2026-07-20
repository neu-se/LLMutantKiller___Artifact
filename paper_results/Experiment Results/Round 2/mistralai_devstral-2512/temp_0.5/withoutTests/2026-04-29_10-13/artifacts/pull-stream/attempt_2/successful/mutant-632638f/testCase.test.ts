const prop = require("../../../../../../../../../../../subject_repositories/pull-stream/util/prop.js");

describe('prop function', () => {
  it('should return a function that retrieves the value at the given key', () => {
    const getProp = prop('testKey');
    const testObject = { testKey: 'expectedValue' };
    expect(getProp(testObject)).toBe('expectedValue');
  });
});