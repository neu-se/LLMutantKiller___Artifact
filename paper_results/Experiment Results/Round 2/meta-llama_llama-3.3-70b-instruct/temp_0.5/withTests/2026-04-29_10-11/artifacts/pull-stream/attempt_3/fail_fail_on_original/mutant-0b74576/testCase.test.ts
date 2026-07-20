import { tester } from '../../util/tester';

describe('tester function', () => {
  it('should return the input when test is not an object with a test function and id function returns the input', () => {
    const test = 'not an object';
    const result = tester(test);
    const input = 'test input';
    expect(result(input)).toBe(input);
  });

  it('should return undefined when test is not an object with a test function and id function returns undefined', () => {
    // Mock the id function to return undefined
    const originalId = (global as any).id;
    (global as any).id = function (e: any) { return undefined; };
    const test = 'not an object';
    const result = tester(test);
    const input = 'test input';
    expect(result(input)).toBeUndefined();
    // Restore the original id function
    (global as any).id = originalId;
  });
});