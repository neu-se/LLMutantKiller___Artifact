import plural from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe('plural function', () => {
  it('should correctly handle string match rules for irregular plurals', () => {
    const result = plural('woman');
    expect(result).toBe('women');
  });
});