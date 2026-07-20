import { plural } from './index';

describe('plural function', () => {
  it('should correctly handle words that end with "fe" or "f" and are not "dwarf" or "roof"', () => {
    expect(plural('knife')).toBe('knives');
    expect(plural('leaf')).toBe('leaves');
    expect(plural('hoof')).toBe('hooves');
    expect(plural('dwarf')).toBe('dwarfs');
    expect(plural('roof')).toBe('roofs');
  });
});