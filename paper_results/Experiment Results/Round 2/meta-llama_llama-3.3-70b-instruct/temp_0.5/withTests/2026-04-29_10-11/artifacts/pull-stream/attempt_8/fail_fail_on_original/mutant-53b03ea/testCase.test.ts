import tester from "../../../../../../../../../../../subject_repositories/pull-stream/util/tester";

describe('tester function', () => {
  it('should return a function that returns the test result when test is an object with a test function', () => {
    const test = { test: { test: () => 'result' } };
    const result = tester(test);
    expect(result('data')).toBe('result');
  });

  it('should throw an error when test is not an object with a test function in the mutated code', () => {
    const test = {};
    expect(() => tester(test)).toThrow();
  });
});