import { tester } from '../../../../../../../../subject_repositories/pull-stream/util/tester';

describe('tester function', () => {
  it('should return a function when test is an object with a test function', () => {
    const test = { test: () => {} };
    const result = tester(test);
    expect(typeof result).toBe('function');
  });

  it('should throw an error when test is not an object or test is not a function', () => {
    const test = 'not an object';
    expect(() => tester(test)).toThrowError();
  });
});