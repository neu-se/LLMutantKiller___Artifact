import tester from "../../../../../../../../../../../subject_repositories/pull-stream/util/tester.js";

describe('tester function behavior', () => {
  it('should return input value when test is a string', () => {
    const result = tester('test');
    expect(result('hello')).toBe('hello');
  });
});