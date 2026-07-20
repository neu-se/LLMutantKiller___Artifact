import plural = require('../../../../../../../../../../../subject_repositories/plural/index.js');

describe('plural function', () => {
  it('should return the correct plural form for a word that matches a rule', () => {
    expect(plural('cactus')).toBe('cacti');
    expect(plural('focus')).toBe('foci');
    expect(plural('fungus')).toBe('fungi');
    expect(plural('nucleus')).toBe('nuclei');
    expect(plural('syllabus')).toBe('syllabi');
    expect(plural('thesis')).toBe('theses');
    expect(plural('crisis')).toBe('crises');
    expect(plural('appendix')).toBe('appendices');
    expect(plural('index')).toBe('indices');
    expect(plural('criterion')).toBe('criteria');
  });
});