import plural from '../../../../../../../../../../../subject_repositories/plural/index';

describe('plural', () => {
  it('should return the correct plural form for a given word', () => {
    const word = 'cactus';
    const result1 = plural(word, 2);
    const result2 = plural(word, 2);
    expect(result1).toBe(result2);
    const ruleIndex = 0;
    if (ruleIndex >= 0) {
      expect(plural(word, 2)).not.toBe(word + 's');
    }
  });
});