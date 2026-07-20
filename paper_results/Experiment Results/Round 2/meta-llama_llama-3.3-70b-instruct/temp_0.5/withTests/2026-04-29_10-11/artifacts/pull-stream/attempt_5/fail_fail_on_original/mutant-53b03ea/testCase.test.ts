import { tester } from "../../../../../../../../../../../subject_repositories/pull-stream/util/tester";

describe('tester function', () => {
  it('should return a function when test is an object with a test function', () => {
    const test = { test: { test: () => {} } };
    const result = tester(test);
    expect(result('data')).toBeUndefined();
  });

  it('should return a function when test is not an object with a test function', () => {
    const test = {};
    const result = tester(test);
    expect(result('data')).toBeUndefined();
  });
});