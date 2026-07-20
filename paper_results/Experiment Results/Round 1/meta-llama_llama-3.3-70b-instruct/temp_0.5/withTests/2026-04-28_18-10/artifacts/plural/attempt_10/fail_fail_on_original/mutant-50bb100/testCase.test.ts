import plural = require('./index.js');

describe('plural', () => {
  it('should correctly pluralize the word "cello"', () => {
    expect(plural('cello')).toBe('cellos');
    expect(plural('cello')).not.toBe('cellos'); // This expectation should fail on the mutated code
  });
});