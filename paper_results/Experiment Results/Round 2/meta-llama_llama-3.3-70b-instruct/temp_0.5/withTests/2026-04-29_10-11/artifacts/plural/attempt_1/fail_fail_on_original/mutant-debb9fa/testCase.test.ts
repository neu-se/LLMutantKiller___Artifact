import { plural } from '../../../../../../../../../../../subject_repositories/plural/index.js';

describe('plural', () => {
  it('should handle f/fe ending words correctly', () => {
    expect(plural('dwarf')).toBe('dwarfs');
  });
});