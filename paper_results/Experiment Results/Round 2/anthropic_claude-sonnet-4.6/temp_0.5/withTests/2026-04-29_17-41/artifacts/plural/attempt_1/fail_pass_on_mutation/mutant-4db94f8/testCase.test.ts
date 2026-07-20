import plural from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe('plural string rules', () => {
  it('should correctly pluralize words with exact string rules like criterion -> criteria', () => {
    expect(plural('criterion')).toBe('criteria');
    expect(plural('bacterium')).toBe('bacteria');
    expect(plural('die')).toBe('dice');
    expect(plural('goose')).toBe('geese');
    expect(plural('mouse')).toBe('mice');
    expect(plural('person')).toBe('people');
    expect(plural('chilli')).toBe('chillies');
    expect(plural('memo')).toBe('memos');
    expect(plural('cello')).toBe('cellos');
  });
});