import plural = require('../../../../index.js');

describe('plural function', () => {
  it('should handle words ending with fe or f correctly', () => {
    expect(plural('dwarf', 2)).toBe('dwarves');
    expect(plural('roof', 2)).toBe('roofs');
    expect(plural('', 2)).not.toBe('ves');
  });
});