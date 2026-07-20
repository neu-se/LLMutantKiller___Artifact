import plural from '../../../../../../../../../../../subject_repositories/plural/index.js';

describe('plural', () => {
  it('should handle words ending with "o" correctly', () => {
    expect(plural('ratio')).toBe('ratios');
    expect(plural('photo', 1)).toBe('photo');
    expect(plural('video', 1)).toBe('video');
    expect(plural('allegro')).toBe('allegros');
    expect(plural('tomato')).toBe('tomatoes');
  });
});