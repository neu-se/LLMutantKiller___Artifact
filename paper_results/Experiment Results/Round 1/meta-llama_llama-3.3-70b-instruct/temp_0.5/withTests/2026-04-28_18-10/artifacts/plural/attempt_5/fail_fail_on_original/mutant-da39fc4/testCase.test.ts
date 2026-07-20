import { plural } from './index';

describe('plural function', () => {
  it('should correctly pluralize "dwarf" and "wolf"', () => {
    expect(plural('dwarf')).toBe('dwarves');
    expect(plural('wolf')).toBe('wolves');
  });
});