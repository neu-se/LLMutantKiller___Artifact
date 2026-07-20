import plural from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe('plural function', () => {
  it('should correctly handle string match rules for irregular plurals with function callbacks', () => {
    expect(plural('woman')).toBe('women');
    expect(plural('man')).toBe('men');
    expect(plural('human')).toBe('humans');
  });
});