import { plural } from '../../../../../../../../../../../subject_repositories/plural/index';

describe('plural function', () => {
  it('should correctly pluralize "dwarf"', () => {
    expect(plural('dwarf')).toBe('dwarves');
  });
});