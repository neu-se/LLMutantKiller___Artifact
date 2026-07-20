import plural from './index';

describe('plural function', () => {
  it('should return the singular form when the input number is 1 and fail when the condition is always true', () => {
    expect(plural('test', 1)).toBe('test');
    expect(plural('test', 2)).toBe('tests');
    expect(plural('test')).not.toBe('test'); // This should fail on the mutated code
  });
});