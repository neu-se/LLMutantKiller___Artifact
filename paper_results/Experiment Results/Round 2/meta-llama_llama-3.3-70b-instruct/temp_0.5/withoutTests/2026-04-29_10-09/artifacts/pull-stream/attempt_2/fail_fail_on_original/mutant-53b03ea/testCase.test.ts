import tester from "../../../../../../../../../../../subject_repositories/pull-stream/util/tester.js";

describe('tester function', () => {
  it('should return a function that calls test.test when test is an object with a test function', () => {
    const test = {
      test: (data: any) => data,
    };
    const result = tester(test);
    expect(result('test data')).toBe('test data');
    expect(tester({})).toBe(tester);
  });
});