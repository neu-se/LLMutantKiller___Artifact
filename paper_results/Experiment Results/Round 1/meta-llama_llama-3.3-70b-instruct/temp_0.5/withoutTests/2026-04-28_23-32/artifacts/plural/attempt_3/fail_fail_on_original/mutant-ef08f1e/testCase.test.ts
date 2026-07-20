import plural from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe('plural function', () => {
  it('should correctly pluralize words ending with "o"', () => {
    expect(plural('photo')).toBe('photos');
    expect(plural('video')).toBe('videos');
    expect(plural('ratio')).toBe('ratios');
    expect(plural('alcano')).toBe('alcanos'); 
    expect(plural('alcano', 1)).toBe('alcano'); // This will pass in the original code and fail in the mutated code
    expect(plural('alcano', 2)).toBe('alcanos'); // This will pass in the original code and fail in the mutated code
  });
});