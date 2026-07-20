import plural from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe('plural function', () => {
  it('should correctly pluralize words ending with "o"', () => {
    expect(plural('photo')).toBe('photoes');
    expect(plural('video')).toBe('videos');
    expect(plural('ratio')).toBe('ratios');
    expect(plural('alcano')).toBe('alcanoes');
    expect(plural('photo', 1)).toBe('photo');
    expect(plural('photo', 2)).toBe('photoes');
    expect(plural('alcano', 1)).toBe('alcano');
    expect(plural('alcano', 2)).toBe('alcanoes');
    expect(plural('photo')).not.toBe('photos'); 
    expect(plural('alcano')).not.toBe('alcanos'); 
    expect(plural('albino')).toBe('albinoes'); // This will pass in the original code and fail in the mutated code
  });
});