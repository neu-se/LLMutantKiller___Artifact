import tester = require('../../../../../../../../../../../subject_repositories/pull-stream/util/tester.js');

describe('tester id fallback', () => {
  it('should return the input value unchanged when no test is provided (null)', () => {
    const fn = tester(null);
    const value = 42;
    expect(fn(value)).toBe(value);
  });
});