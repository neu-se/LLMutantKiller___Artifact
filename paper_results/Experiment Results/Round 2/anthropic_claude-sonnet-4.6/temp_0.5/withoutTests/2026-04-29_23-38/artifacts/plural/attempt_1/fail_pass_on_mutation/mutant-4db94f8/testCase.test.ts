import plural from "../../../../../../../../../../../subject_repositories/plural/index.js"

describe('plural', () => {
  it('should correctly pluralize words with string rules', () => {
    expect(plural('criterion')).toBe('criteria');
  });
});