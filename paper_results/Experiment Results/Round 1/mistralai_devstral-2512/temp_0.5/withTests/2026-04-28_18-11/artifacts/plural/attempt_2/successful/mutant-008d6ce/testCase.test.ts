import plural from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe('plural function with count parameter', () => {
  it('should return plural form when count is not 1', () => {
    expect(plural('test', 2)).toBe('tests');
    expect(plural('hero', 3)).toBe('heroes');
    expect(plural('cherry', 0)).toBe('cherries');
    expect(plural('box', 10)).toBe('boxes');
    expect(plural('mouse', 5)).toBe('mice');
  });
});