import plural from '../../../../../../../../../../../subject_repositories/plural/index.js';

describe('plural', () => {
  it('should correctly handle rules array initialization', () => {
    expect(Array.isArray(plural.addRule('test', 'tests'))).toBe(false);
    expect(plural('test')).toBe('tests');
    plural.addRule('hero', 'heroes');
    expect(plural('hero')).toBe('heroes');
  });
});