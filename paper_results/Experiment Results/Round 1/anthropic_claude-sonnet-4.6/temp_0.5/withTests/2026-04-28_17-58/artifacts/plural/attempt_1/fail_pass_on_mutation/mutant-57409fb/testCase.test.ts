import plural from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe('plural with undefined num argument', () => {
  it('should return plural form when num is explicitly passed as undefined', () => {
    expect(plural('test', undefined)).toBe('tests');
  });
});