import plural = require('../../../../../../../../../../../subject_repositories/plural/index.js');

describe('plural function', () => {
  it('should correctly handle string rules', () => {
    const word = 'test';
    const result1 = plural(word);
    const result2 = plural(word);
    expect(result1).toBe(result2);
    expect(result1).toBe('tests');
  });
});