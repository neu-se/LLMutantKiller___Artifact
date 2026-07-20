import plural = require('../../../../../../../../../subject_repositories/plural/index.js');

describe('plural', () => {
  it('should handle -ics ending words correctly', () => {
    expect(plural('mathematics')).toBe('mathematics');
    expect(plural('MathEmAtIcS')).not.toBe('MathEmAtIcSes');
  });
});