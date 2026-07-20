import tester = require('../../../../../../../../../../../subject_repositories/pull-stream/util/tester.js');

describe('tester', () => {
  it('should return a function that calls regexp.test when given a regexp', () => {
    const regexp = /^hello/;
    const testFn = tester(regexp);

    // Original: testFn('hello world') calls regexp.test('hello world') => true
    // Mutated: falls through to id, so testFn('hello world') returns 'hello world' (not a boolean false)
    // Original: testFn('goodbye') calls regexp.test('goodbye') => false
    // Mutated: falls through to id, so testFn('goodbye') returns 'goodbye' (truthy, not false)

    expect(testFn('hello world')).toBe(true);
    expect(testFn('goodbye')).toBe(false);
  });
});