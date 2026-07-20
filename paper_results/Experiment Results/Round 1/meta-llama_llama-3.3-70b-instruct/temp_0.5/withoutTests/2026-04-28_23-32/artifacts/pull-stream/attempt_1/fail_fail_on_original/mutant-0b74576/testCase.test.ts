import { tester } from "../../../../../../../../../../../subject_repositories/pull-stream/util/tester.js";

describe('tester function', () => {
  it('should return the identity function when test is not an object with a test method', () => {
    const test = 'not an object';
    const result = tester(test);
    expect(result('input')).toBe('input');
  });
});