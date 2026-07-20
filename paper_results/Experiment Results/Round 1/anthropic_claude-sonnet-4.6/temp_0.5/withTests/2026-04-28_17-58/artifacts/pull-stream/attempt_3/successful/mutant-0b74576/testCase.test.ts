import tester = require('../../../../../../../../../../../subject_repositories/pull-stream/util/tester.js');

describe('tester id fallback', () => {
  it('should return the input value unchanged when test is undefined', () => {
    const fn = tester(undefined);
    const value = 'hello';
    expect(fn(value)).toBe(value);
  });
});