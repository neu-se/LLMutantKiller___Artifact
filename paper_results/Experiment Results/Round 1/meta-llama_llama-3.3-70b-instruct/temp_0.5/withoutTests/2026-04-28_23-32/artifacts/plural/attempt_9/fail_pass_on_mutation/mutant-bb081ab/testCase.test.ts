import plural from '../../../../../../../../../../../subject_repositories/plural/index';

describe('plural', () => {
  it('should return the correct plural form for a given word', () => {
    const word = 'cactus';
    const result = plural(word, 2);
    expect(result).toBe('cacti');
    const result2 = plural(word, 1);
    expect(result2).toBe(word);
    expect(result).not.toBe(result2);
  });
});