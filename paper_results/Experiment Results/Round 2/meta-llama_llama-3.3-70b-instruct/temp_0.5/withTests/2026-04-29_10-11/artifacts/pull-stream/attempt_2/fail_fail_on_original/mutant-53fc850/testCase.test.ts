import { tester } from "../../../../../../../../../../../subject_repositories/pull-stream/util/tester.js";

describe('tester function', () => {
  it('should return a function when test is an object with a test function', () => {
    const test = { test: jest.fn() };
    const result = tester(test);
    expect(typeof result).toBe('function');
    expect(result({})).toBeUndefined();
  });

  it('should return the prop function when test is an object but not with a test function in the original code', () => {
    const test = { foo: 'bar' };
    const result = tester(test);
    expect(result).not.toBeUndefined();
  });

  it('should return the id function when test is not an object in the original code', () => {
    const test = 'not an object';
    const result = tester(test);
    expect(result).not.toBeUndefined();
  });

  it('should return the id function when test is an object but not with a test function in the mutated code', () => {
    const test = { foo: 'bar' };
    const result = tester(test);
    expect(result).not.toBeUndefined();
  });

  it('should return the prop function when test is not an object in the mutated code', () => {
    const test = 'not an object';
    const result = tester(test);
    expect(result).not.toBeUndefined();
  });
});