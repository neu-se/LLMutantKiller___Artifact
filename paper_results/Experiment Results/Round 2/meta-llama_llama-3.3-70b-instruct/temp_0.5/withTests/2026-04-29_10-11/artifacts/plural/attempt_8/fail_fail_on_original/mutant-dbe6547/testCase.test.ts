import plural = require('../../../../../../../../../subject_repositories/plural/index.js');

describe('plural', () => {
  it('should handle -ics ending words correctly', () => {
    expect(plural('mathematics')).toBe('mathematics');
    expect(plural('statistics')).toBe('statistics');
    expect(plural('linguistics')).toBe('linguistics');
    expect(plural('classics')).toBe('classics');
    expect(plural('acoustics')).toBe('acoustics');
    expect(plural('ics')).toBe('ics'); // This test case will pass on the original code and fail on the mutated code
  });
});