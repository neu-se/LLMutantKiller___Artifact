import { plural } from '../../../index';

describe('plural function', () => {
  it('should return the correct plural form for the word "cello"', () => {
    expect(plural('cello')).toBe('cellos');
  });
});