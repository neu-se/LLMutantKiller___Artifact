import plural from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe('plural', () => {
  it('should pluralize correctly when num is 0', () => {
    expect(plural('test', 0)).toBe('tests');
    expect(plural('test', 2)).toBe('tests');
    expect(plural('test', 1)).toBe('test');
    expect(plural('cherry', 0)).toBe('cherries');
    expect(plural('cherry', 2)).toBe('cherries');
    expect(plural('cherry', 1)).toBe('cherry');
  });
});