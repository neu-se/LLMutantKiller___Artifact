import plural = require('../../../../../../../subject_repositories/plural/index.js');

describe('plural', () => {
  it('should return the correct plural form for words that end with "quy"', () => {
    expect(plural('quy')).toBe('quies');
    expect(plural('quy', 1)).toBe('quy');
    expect(plural('soliloquy')).toBe('soliloquies');
    expect(plural('quy', 2)).toBe('quies');
    expect(plural('qu')).toBe('quies'); // This should fail in the mutated code
  });
});