import plural = require('../../../../../../../../../../../subject_repositories/plural/index.js');

describe('plural function', () => {
  it('should correctly handle string rules', () => {
    const word = 'criterion';
    const result = plural(word);
    expect(result).toBe('criteria');
    const word2 = 'criter';
    const result2 = plural(word2);
    expect(result2).toBe('criters');
  });
});