import { plural } from '../../../../../../../../../../../subject_repositories/plural/index.js';

describe('plural function', () => {
  it('should correctly handle words that end with fe or f', () => {
    expect(plural('dwarf', 2)).toBe('dwarves');
    expect(plural('roof', 2)).toBe('roofs');
  });
});