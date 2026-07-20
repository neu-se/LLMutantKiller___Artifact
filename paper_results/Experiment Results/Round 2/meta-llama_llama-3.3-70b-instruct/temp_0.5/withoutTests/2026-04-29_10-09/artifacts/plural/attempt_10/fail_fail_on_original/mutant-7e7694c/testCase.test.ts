import { plural } from '../../index';

describe('plural function', () => {
  it('should correctly pluralize "dwarf" and "roof" when using the "fe" or "f" ending rule', () => {
    expect(plural('dwarf', 2)).toBe('dwarves');
    expect(plural('roof', 2)).toBe('roofs');
  });
});