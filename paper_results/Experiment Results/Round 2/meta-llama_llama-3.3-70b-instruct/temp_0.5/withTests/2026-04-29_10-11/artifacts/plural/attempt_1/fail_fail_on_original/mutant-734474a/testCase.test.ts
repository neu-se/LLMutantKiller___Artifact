import { plural } from '../index';

describe('plural function', () => {
  it('should return the correct plural form for "bacterium"', () => {
    expect(plural('bacterium')).toBe('bacteria');
    expect(plural('bacterium', 2)).toBe('bacteria');
    expect(plural('bacterium', 1)).toBe('bacterium');
  });
});