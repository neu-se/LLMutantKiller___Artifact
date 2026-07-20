import plural from '../../../../../../../../../../../subject_repositories/plural/index.js';

describe('plural', () => {
  it('should correctly handle rules array initialization', () => {
    expect(plural.addRule).toBeDefined();
    expect(plural.addRule('test', 'tests')).toBe(plural);
    expect(plural('test')).toBe('tests');
    expect(plural('hero')).toBe('heroes');
  });
});