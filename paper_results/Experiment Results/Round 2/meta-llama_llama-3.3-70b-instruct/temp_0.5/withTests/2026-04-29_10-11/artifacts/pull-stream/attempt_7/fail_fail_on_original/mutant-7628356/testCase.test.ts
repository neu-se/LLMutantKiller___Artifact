import { tester } from '../../util/tester.js';

describe('tester function', () => {
  it('should return a function that calls test.test when test is an object with a test method', () => {
    const testObject = {
      test: () => {},
    };
    const result = tester(testObject);
    expect(typeof result).toBe('function');
    result('data');
    expect(testObject.test).toHaveBeenCalledTimes(1);
    expect(testObject.test).toHaveBeenCalledWith('data');
  });

  it('should return the id function when test is not an object', () => {
    const testObject = "";
    const result = tester(testObject);
    expect(result).not.toBe(testObject);
    expect(result('data')).toBe('data');
  });
});