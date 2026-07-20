import { plural } from '../../../../../../../../../../../subject_repositories/plural/index.js';

describe('plural', () => {
  it('should correctly pluralize words that end with "fe" or "f"', () => {
    expect(plural('dwarf')).toBe('dwarfs');
    expect(plural('roof')).toBe('roofs');
    expect(plural('knife')).toBe('knives');
    expect(plural('leaf')).toBe('leaves');
    expect(plural('hoof')).toBe('hooves');
  });
});