import plural from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe('plural', () => {
  it('should return plural form when num is 2', () => {
    expect(plural('test', 2)).toBe('tests');
  });
});