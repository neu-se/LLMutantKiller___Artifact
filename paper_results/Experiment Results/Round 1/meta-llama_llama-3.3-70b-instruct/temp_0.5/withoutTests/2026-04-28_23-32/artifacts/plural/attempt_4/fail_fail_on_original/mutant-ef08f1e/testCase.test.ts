import plural from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe('plural function', () => {
  it('should correctly pluralize words ending with "o"', () => {
    expect(plural('photo')).toBe('photoes');
    expect(plural('video')).toBe('videos');
    expect(plural('ratio')).toBe('ratios');
    expect(plural('alcano')).toBe('alcanos');
    expect(plural('alcano', 1)).toBe('alcano');
    expect(plural('alcano', 2)).toBe('alcanos');
    expect(plural('photo', 1)).toBe('photo');
    expect(plural('photo', 2)).toBe('photoes');
  });
});