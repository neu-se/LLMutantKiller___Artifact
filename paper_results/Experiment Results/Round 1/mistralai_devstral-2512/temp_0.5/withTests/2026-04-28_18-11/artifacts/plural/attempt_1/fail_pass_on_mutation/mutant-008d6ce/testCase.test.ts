import plural from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe('plural function with count parameter', () => {
  it('should return singular form when count is 1', () => {
    expect(plural('test', 1)).toBe('test');
    expect(plural('hero', 1)).toBe('hero');
    expect(plural('cherry', 1)).toBe('cherry');
    expect(plural('box', 1)).toBe('box');
    expect(plural('mouse', 1)).toBe('mouse');
  });
});