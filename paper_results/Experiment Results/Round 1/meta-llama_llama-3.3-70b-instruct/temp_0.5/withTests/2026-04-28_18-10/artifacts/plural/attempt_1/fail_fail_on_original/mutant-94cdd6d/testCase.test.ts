import { plural } from '../../index';

describe('plural function', () => {
  it('should return the singular form when the input number is 1', () => {
    expect(plural('test', 1)).toBe('test');
  });

  it('should return the plural form when the input number is not 1', () => {
    expect(plural('test', 2)).toBe('tests');
  });

  it('should return the plural form when the input number is undefined', () => {
    expect(plural('test')).toBe('tests');
  });
});