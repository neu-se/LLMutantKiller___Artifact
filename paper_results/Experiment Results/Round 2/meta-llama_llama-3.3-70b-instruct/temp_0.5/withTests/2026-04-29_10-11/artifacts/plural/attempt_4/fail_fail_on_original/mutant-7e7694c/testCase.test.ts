import plural = require('../../../../../../../../../subject_repositories/plural/index.js');

describe('plural', () => {
  it('should correctly pluralize words that end with "f" or "fe"', () => {
    expect(plural('dwarf')).toBe('dwarves');
    expect(plural('roof')).toBe('rooves');
    expect(plural('knife')).toBe('knives');
    expect(plural('leaf')).toBe('leaves');
  });
});