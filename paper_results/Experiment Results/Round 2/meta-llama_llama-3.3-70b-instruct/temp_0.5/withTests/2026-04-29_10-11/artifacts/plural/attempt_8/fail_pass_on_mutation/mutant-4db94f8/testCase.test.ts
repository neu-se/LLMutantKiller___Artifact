import plural = require('../../../../../../../../../../../subject_repositories/plural/index.js');

describe('plural function', () => {
  it('should correctly handle string rules', () => {
    const word = 'criterion';
    const result = plural(word);
    expect(result).toBe('criteria');
    const word2 = 'test';
    const result2 = plural(word2);
    expect(result2).toBe('tests');
    const word3 = 'foo';
    const result3 = plural(word3);
    expect(result3).toBe('foos');
    const word4 = 'criterion';
    const result4 = plural(word4);
    expect(result4).toBe('criteria');
    expect(plural('criterion')).toBe('criteria');
  });
});