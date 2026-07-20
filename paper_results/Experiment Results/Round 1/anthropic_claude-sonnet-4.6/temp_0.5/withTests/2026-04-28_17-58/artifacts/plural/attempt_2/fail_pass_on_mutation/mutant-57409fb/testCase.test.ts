import plural from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe('plural with no num argument', () => {
  it('should return plural form when num argument is omitted', () => {
    expect(plural('test')).toBe('tests');
  });
});