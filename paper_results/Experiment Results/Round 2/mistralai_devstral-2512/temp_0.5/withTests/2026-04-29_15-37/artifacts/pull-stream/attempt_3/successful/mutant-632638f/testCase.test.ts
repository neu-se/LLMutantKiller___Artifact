const prop = require("../../../../../../../../../../../subject_repositories/pull-stream/util/prop.js");

describe('prop function behavior', () => {
  it('should return a function that accesses the specified key when key is truthy and not a regexp', () => {
    const getProp = prop('test');
    const data = { test: 'value' };
    expect(getProp(data)).toBe('value');
  });
});