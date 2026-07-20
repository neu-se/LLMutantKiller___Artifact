import { test } from 'tape';
import { tester } from '../../../../../../../../subject_repositories/pull-stream/util/tester.js';

describe('tester function', () => {
  it('should return a function that calls the test function with data', () => {
    const testFunction = jest.fn((data: any) => data);
    const testerFunction = tester(testFunction);
    const data = 'test data';
    const result = testerFunction(data);
    expect(testFunction).toHaveBeenCalledTimes(1);
    expect(testFunction).toHaveBeenCalledWith(data);
    expect(result).toBe(data);
  });

  it('should return the id function if the test is not a function', () => {
    const nonFunctionTest = 'not a function';
    const testerFunction = tester(nonFunctionTest);
    const data = 'test data';
    const result = testerFunction(data);
    expect(result).toBe(data);
  });

  it('should return the id function if the test is not an object with a test function', () => {
    const nonObjectTest = 'not an object';
    const testerFunction = tester(nonObjectTest);
    const data = 'test data';
    const result = testerFunction(data);
    expect(result).toBe(data);
  });
});