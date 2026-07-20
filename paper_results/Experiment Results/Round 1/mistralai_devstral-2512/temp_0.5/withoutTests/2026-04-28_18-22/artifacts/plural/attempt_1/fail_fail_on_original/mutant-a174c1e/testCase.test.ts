import plural from './index.js';

describe('plural function behavior', () => {
  it('should return singular form when count is 1', () => {
    expect(plural('apple', 1)).toBe('apple');
    expect(plural('box', 1)).toBe('box');
    expect(plural('child', 1)).toBe('child');
    expect(plural('person', 1)).toBe('person');
  });
});