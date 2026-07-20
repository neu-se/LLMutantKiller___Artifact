import { tester } from '../../../../../../../../subject_repositories/pull-stream/util/tester.js';

describe('tester function', () => {
  it('should return a function that calls test.test when test is an object with a test method', () => {
    const testObject = {
      test: jest.fn(),
    };
    const result = tester(testObject);
    result('data');
    expect(testObject.test).toHaveBeenCalledTimes(1);
    expect(testObject.test).toHaveBeenCalledWith('data');
  });

  it('should return the id function when test is not an object with a test method', () => {
    const testObject = {};
    const result = tester(testObject);
    const returnValue = result('data');
    expect(returnValue).toBe('data');
  });

  it('should pass when test is an object', () => {
    const testObject = {
      test: jest.fn(),
    };
    const result = tester(testObject);
    expect(typeof result).toBe('function');
  });

  it('should fail when test is not an object', () => {
    const testObject = "string";
    expect(() => tester(testObject)).toThrow();
  });
});