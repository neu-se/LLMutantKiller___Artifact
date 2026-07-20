import { plural } from '../../../../../../../../../../../subject_repositories/plural/index';

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
  });
});