const plural = require('./index');

describe('plural', () => {
  it('should correctly handle the plural form of a word with a custom rule', () => {
    const originalFunction = plural('test');
    expect(originalFunction).toBe('tests');
    const mutatedFunction = plural('test', 1);
    expect(mutatedFunction).toBe('test');
  });
});