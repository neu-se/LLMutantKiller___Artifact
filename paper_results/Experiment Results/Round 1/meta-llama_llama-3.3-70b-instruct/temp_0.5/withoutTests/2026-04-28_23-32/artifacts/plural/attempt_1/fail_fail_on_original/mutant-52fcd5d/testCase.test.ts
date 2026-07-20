import { plural } from '../../../../../../../../../../../subject_repositories/plural/index.js';

describe('plural function', () => {
  it('should handle words that end in -ics correctly', () => {
    expect(plural('mathematics', 2)).toBe('mathematics');
    expect(plural('statistics', 2)).toBe('statistics');
    expect(plural('linguistics', 2)).toBe('linguistics');
    expect(plural('classics', 2)).toBe('classics');
    expect(plural('acoustics', 2)).toBe('acoustics');
    expect(plural('tropic', 2)).toBe('tropics');
  });
});