import tester = require('../../../../../../../../../../../subject_repositories/pull-stream/util/tester.js');

describe('tester', () => {
  it('should return the input value unchanged when test is undefined (identity fallback)', () => {
    // When test is undefined, typeof undefined !== 'object', so regexp branch is skipped
    // prop(undefined) should be falsy, so tester falls back to the id function
    // The id function should return the element itself (identity)
    const fn = tester(undefined);
    const value = 42;
    expect(fn(value)).toBe(value);
  });
});