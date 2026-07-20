import { tester } from "../../../../../../../../../../../subject_repositories/pull-stream/util/tester";

describe('tester function', () => {
  it('should return a function when test is an object with a test function', () => {
    const test = { test: () => {} };
    const result = tester(test);
    expect(typeof result).toBe('function');
  });

  it('should return the prop function when test is not an object with a test function', () => {
    const test = 'not an object';
    const result = tester(test);
    expect(result).toBeUndefined();
  });
});