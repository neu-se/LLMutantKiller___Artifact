import plural = require('./index.js');

describe('plural', () => {
  it('should return the correct plural form for words that end with "quy"', () => {
    expect(plural('soliloquy')).toBe('soliloquies');
    expect(plural('quy')).toBe('quies');
    expect(plural('quy', 1)).toBe('quy');
    expect(plural('quy')).toBe('quies'); // This should pass in the original code and fail in the mutated code
  });
});