import { tester } from '../../../../../../../../subject_repositories/pull-stream/util/tester';

describe('tester function', () => {
  it('should return the input when test is not an object with a test function', () => {
    const test = 'not an object';
    const result = tester(test);
    const input = 'test input';
    expect(result(input)).toBe(input);
  });
});