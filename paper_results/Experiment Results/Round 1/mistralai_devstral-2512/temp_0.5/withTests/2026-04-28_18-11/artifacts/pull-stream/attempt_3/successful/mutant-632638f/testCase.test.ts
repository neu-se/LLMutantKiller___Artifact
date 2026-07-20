const prop = require("../../../../../../../../../../../subject_repositories/pull-stream/util/prop.js");

describe('prop function behavior', () => {
  it('should return a function that accesses object properties when key is truthy', () => {
    const propFunc = prop('testKey');
    const testData = { testKey: 'expectedValue' };
    const result = propFunc(testData);
    expect(result).toBe('expectedValue');
  });
});