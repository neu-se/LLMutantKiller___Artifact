import plural from '../../../../../../../../../../../subject_repositories/plural/index';

describe('plural function', () => {
  it('should handle words with rules correctly', () => {
    expect(plural('cactus', 2)).toBe('cacti');
    expect(plural('focus', 2)).toBe('foci');
    expect(plural('fungus', 2)).toBe('fungi');
    expect(plural('nucleus', 2)).toBe('nuclei');
    expect(plural('syllabus', 2)).toBe('syllabi');
    expect(plural('crisis', 2)).toBe('crises');
    expect(plural('thesis', 2)).toBe('theses');
    expect(plural('appendix', 2)).toBe('appendices');
    expect(plural('index', 2)).toBe('indices');
    expect(plural('criterion', 2)).toBe('criteria');
    expect(plural('bacterium', 2)).toBe('bacteria');
    expect(plural('memo', 2)).toBe('memos');
    expect(plural('cello', 2)).toBe('cellos');
    expect(plural('die', 2)).toBe('dice');
    expect(plural('goose', 2)).toBe('geese');
    expect(plural('mouse', 2)).toBe('mice');
    expect(plural('person', 2)).toBe('people');
    expect(plural('chilli', 2)).toBe('chillies');
    expect(plural('woman', 2)).toBe('women');
  });
});