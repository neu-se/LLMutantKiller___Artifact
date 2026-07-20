import { plural } from '../../../../../../../../../../../subject_repositories/plural/index';

describe('plural library', () => {
  it('should correctly pluralize words that end with "f" or "fe"', () => {
    expect(plural('dwarf')).toBe('dwarfs');
    expect(plural('roof')).toBe('roofs');
  });
});