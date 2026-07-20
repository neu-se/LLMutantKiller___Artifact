describe('tester function', () => {
  it('should return a function when test is an object with a test function', () => {
    const test = { test: jest.fn() };
    const tester = require('./util/tester.js');
    const result = tester(test);
    expect(typeof result).toBe('function');
    result('data');
    expect(test.test).toHaveBeenCalledTimes(1);
    expect(test.test).toHaveBeenCalledWith('data');
  });

  it('should not return a function when test is an empty string in the mutated code', () => {
    const test = "";
    const tester = require('./util/tester.js');
    const result = tester(test);
    expect(result).toBe(test);
  });
});