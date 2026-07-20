import { plural } from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe('plural function', () => {
  it('should correctly pluralize words ending with "o"', () => {
    expect(plural('photo')).toBe('photos');
    expect(plural('video')).toBe('videos');
    expect(plural('ratio')).toBe('ratios');
  });
});