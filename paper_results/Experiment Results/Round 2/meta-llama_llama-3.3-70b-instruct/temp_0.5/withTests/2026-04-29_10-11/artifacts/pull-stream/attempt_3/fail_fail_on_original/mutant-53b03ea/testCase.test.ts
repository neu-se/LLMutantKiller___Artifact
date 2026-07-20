import { tester } from "../../../../../../../../../../../subject_repositories/pull-stream/util/tester";

describe('tester function', () => {
  it('should return a function that calls test.test when test is an object with a test function', () => {
    const test = { test: { test: () => {} } };
    const result = tester(test);
    expect(result).toBeInstanceOf(Function);
  });

  it('should return false when test is not an object with a test function in the mutated code', () => {
    const test = {};
    const result = tester(test);
    expect(result).toBeInstanceOf(Function);
  });
});