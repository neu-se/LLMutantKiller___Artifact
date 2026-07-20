import { plural } from '../index';

describe('plural function', () => {
  it('should correctly pluralize "bacterium"', () => {
    expect(plural('bacterium')).toBe('bacteria');
  });
});