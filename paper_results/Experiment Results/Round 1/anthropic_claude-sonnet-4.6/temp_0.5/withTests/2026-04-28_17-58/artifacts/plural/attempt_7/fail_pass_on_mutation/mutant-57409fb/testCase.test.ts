import plural from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe('plural', () => {
  it('should return plural when num is not provided and singular when num is 1', () => {
    expect(plural('test')).toBe('tests');
    expect(plural('test', 1)).toBe('test');
    expect(plural('test', 2)).toBe('tests');
  });
});