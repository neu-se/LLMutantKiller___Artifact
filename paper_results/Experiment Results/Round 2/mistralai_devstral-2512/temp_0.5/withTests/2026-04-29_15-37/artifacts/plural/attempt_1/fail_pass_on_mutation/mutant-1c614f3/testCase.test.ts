import plural from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe('plural function with exact match rules', () => {
  it('should correctly pluralize words with exact match rules', () => {
    expect(plural('criterion')).toBe('criteria');
    expect(plural('bacterium')).toBe('bacteria');
    expect(plural('memo')).toBe('memos');
    expect(plural('cello')).toBe('cellos');
    expect(plural('die')).toBe('dice');
    expect(plural('goose')).toBe('geese');
    expect(plural('mouse')).toBe('mice');
    expect(plural('person')).toBe('people');
    expect(plural('chilli')).toBe('chillies');
  });
});