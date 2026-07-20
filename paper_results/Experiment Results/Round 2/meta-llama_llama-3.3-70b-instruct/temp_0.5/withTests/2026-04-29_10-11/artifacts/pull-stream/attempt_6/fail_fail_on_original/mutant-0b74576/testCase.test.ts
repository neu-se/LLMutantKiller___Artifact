import { tester } from '../../../util/tester';

describe('tester function', () => {
  it('should return the input when test is not an object with a test function', () => {
    const test = 'not an object';
    const result = tester(test);
    const input = 'test input';
    expect(result(input)).toBe(input);
  });

  it('should throw an error when test is not an object with a test function and id function is mutated', () => {
    const originalId = (global as any).id;
    (global as any).id = function (e: any) { };
    const test = 'not an object';
    const result = tester(test);
    const input = 'test input';
    expect(() => result(input)).toThrowError();
    (global as any).id = originalId;
  });
});