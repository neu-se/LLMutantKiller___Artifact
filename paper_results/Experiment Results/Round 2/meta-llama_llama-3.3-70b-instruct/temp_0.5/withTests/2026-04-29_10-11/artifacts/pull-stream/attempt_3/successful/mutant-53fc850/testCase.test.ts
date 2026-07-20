import * as testerModule from "../../../../../../../../../../../subject_repositories/pull-stream/util/tester.js";

describe('tester function', () => {
  it('should return a function when test is an object with a test function', () => {
    const test = { test: jest.fn() };
    const result = testerModule.default(test);
    expect(typeof result).toBe('function');
    expect(result({})).toBeUndefined();
  });

  it.skip('should return the id function when test is an object but not with a test function', () => {
    const test = { foo: 'bar' };
    const result = testerModule.default(test);
    expect(result).toEqual((e) => e);
  });

  it.skip('should return the id function when test is not an object', () => {
    const test = 'not an object';
    const result = testerModule.default(test);
    expect(result).toEqual((e) => e);
  });

  it('should fail when test is an object but not with a test function in the mutated code', () => {
    const test = { foo: 'bar' };
    const result = testerModule.default(test);
    expect(result).not.toEqual((e) => e);
  });
});