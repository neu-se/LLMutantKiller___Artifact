import plural from '../../../../../../../../../../../subject_repositories/plural/index.js';

describe('plural function', () => {
  it('should correctly handle words that end with fe or f', () => {
    expect(plural('wolf', 2)).toBe('wolves');
    expect(plural('dwarf', 2)).toBe('dwarfs');
    expect(plural('roof', 2)).toBe('roofs');
    expect(plural('chief', 2)).toBe('chieves');
  });
});