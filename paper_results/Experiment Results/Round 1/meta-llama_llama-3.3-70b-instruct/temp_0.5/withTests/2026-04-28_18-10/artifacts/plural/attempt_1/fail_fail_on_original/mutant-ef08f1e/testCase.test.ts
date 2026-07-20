import { plural } from '../../../../../../../../../../../subject_repositories/plural/index.js';

describe('plural', () => {
  it('should handle words ending with "o" correctly', () => {
    expect(plural('photo')).toBe('photos');
    expect(plural('photo', 1)).toBe('photo');
    expect(plural('video')).toBe('videos');
    expect(plural('video', 1)).toBe('video');
  });
});