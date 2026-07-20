import plural from '../../../../../../../../../../../subject_repositories/plural/index';

describe('plural function', () => {
  it('should correctly pluralize words that end with "f" or "fe"', () => {
    expect(plural('knife')).toBe('knives');
    expect(plural('dwarf')).toBe('dwarfs');
    expect(plural('roof')).toBe('roofs');
  });
});