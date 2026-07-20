import tester = require('../../../../../../../../../../../subject_repositories/pull-stream/util/tester.js');

describe('tester', () => {
  it('should return the input value unchanged when test is null (identity fallback)', () => {
    // When test is null, prop(null) is falsy, so tester falls back to the id function
    // The id function should return the element itself (identity)
    const fn = tester(null);
    const value = 'hello';
    expect(fn(value)).toBe(value);
  });
});