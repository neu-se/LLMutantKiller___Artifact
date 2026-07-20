import { tester } from '../../util/tester.js';

describe('tester function', () => {
  it('should return a function that calls test.test when test is an object with a test method', () => {
    const testObject = {
      test: jest.fn(),
    };
    const result = tester(testObject);
    expect(typeof result).toBe('function');
    result('data');
    expect(testObject.test).toHaveBeenCalledTimes(1);
    expect(testObject.test).toHaveBeenCalledWith('data');
  });

  it('should throw an error when test is not an object', () => {
    const testObject = "";
    expect(() => tester(testObject)).toThrow();
  });
});