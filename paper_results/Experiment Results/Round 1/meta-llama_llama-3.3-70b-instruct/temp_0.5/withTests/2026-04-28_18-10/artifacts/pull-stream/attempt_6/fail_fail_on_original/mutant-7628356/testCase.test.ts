describe('tester function', () => {
  it('should return a function when test is an object', () => {
    const test = { foo: 'bar' };
    const tester = require('../../../../../../subject_repositories/pull-stream/util/tester.js');
    const result = tester(test);
    expect(typeof result).toBe('function');
  });

  it('should not return a function when test is not an object', () => {
    const test = "";
    const tester = require('../../../../../../subject_repositories/pull-stream/util/tester.js');
    const result = tester(test);
    expect(result).not.toBeInstanceOf(Function);
  });
});