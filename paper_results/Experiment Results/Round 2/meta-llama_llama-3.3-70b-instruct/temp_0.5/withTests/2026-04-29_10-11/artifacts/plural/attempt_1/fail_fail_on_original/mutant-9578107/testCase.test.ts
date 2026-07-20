import { plural } from '../../../../../../../../../../../subject_repositories/plural/index.js';

describe('plural', () => {
  it('should correctly pluralize words that end with "fe" or "f" and are not "dwarf" or "roof"', () => {
    expect(plural('knife')).toBe('knives');
    expect(plural('leaf')).toBe('leaves');
    expect(plural('hoof')).toBe('hooves');
    expect(plural('dwarf')).toBe('dwarfs');
    expect(plural('roof')).toBe('roofs');
  });
});