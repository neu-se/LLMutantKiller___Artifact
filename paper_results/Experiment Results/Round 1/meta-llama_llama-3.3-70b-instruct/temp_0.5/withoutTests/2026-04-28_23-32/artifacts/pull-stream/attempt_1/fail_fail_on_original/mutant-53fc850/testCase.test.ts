import { tester } from "../../../../../../../../../../../subject_repositories/pull-stream/util/tester.js";

describe('tester function', () => {
  it('should return a function when test is an object with a test method', () => {
    const test = {
      test: (data: any) => data,
    };
    const result = tester(test);
    expect(typeof result).toBe('function');
    expect(result('test data')).toBe('test data');
  });
});