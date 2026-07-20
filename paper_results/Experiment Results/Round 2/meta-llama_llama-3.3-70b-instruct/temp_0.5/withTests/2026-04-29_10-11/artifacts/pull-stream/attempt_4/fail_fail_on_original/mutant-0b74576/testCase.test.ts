import { tester } from '../../../../../../../../subject_repositories/pull-stream/util/tester';

describe('tester function', () => {
  it('should return the input when test is not an object with a test function', () => {
    const test = 'not an object';
    const result = tester(test);
    const input = 'test input';
    expect(result(input)).toBe(input);
  });

  it('should return undefined when test is not an object with a test function and id function returns undefined', () => {
    const originalId = (global as any).id;
    (global as any).id = function (e: any) { return undefined; };
    const test = 'not an object';
    const result = tester(test);
    const input = 'test input';
    expect(result(input)).toBeUndefined();
    (global as any).id = originalId;
  });
});