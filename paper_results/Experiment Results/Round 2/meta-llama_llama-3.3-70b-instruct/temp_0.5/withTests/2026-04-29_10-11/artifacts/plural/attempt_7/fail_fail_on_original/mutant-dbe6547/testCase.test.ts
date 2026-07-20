import plural = require('./index.js');

describe('plural', () => {
  it('should handle -ics ending words correctly', () => {
    expect(plural('mathematics')).toBe('mathematics');
    expect(plural('statistics')).toBe('statistics');
    expect(plural('linguistics')).toBe('linguistics');
    expect(plural('classics')).toBe('classics');
    expect(plural('acoustics')).toBe('acoustics');
    expect(plural('atics')).toBe('atics'); 
  });
});