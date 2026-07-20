import plural from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe('plural function', () => {
  it('should correctly handle string-based rules that require function execution', () => {
    expect(plural('man')).toBe('men');
    expect(plural('woman')).toBe('women');
    expect(plural('person')).toBe('people');
  });
});