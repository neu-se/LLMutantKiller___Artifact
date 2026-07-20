import plural from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe('plural function', () => {
  it('should correctly pluralize "knife" to "knives"', () => {
    expect(plural('knife')).toBe('knives');
  });
});