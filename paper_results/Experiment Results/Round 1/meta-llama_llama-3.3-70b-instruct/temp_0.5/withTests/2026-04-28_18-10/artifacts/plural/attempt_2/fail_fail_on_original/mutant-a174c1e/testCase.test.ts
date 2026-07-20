import { plural } from './index';

describe('plural function', () => {
  it('should handle singular and plural forms correctly', () => {
    expect(plural('test', 1)).toBe('test');
    expect(plural('test', 2)).toBe('tests');
    expect(plural('test')).not.toBe('tests');
  });
});