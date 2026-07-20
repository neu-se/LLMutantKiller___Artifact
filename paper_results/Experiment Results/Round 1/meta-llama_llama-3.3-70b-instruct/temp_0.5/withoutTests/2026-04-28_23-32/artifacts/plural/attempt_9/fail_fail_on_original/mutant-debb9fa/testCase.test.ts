import { plural } from './index';

describe('plural function', () => {
  it('should return the correct plural form for the word "elf"', () => {
    expect(plural('elf', 2)).toBe('elves');
  });
  it('should return the correct plural form for the word "dwarf"', () => {
    expect(plural('dwarf', 2)).toBe('dwarfs');
  });
  it('should return the correct plural form for the word ""', () => {
    expect(plural('', 2)).toBe('ves');
  });
});