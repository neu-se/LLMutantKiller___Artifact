import plural from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe('plural', () => {
  it('should return singular form when num equals 1 for words with special rules', () => {
    // When num is 1, should return word unchanged regardless of rules
    expect(plural('criterion', 1)).toBe('criterion');
    expect(plural('die', 1)).toBe('die');
    expect(plural('goose', 1)).toBe('goose');
    expect(plural('mouse', 1)).toBe('mouse');
    expect(plural('person', 1)).toBe('person');
    expect(plural('man', 1)).toBe('man');
    expect(plural('woman', 1)).toBe('woman');
  });
});