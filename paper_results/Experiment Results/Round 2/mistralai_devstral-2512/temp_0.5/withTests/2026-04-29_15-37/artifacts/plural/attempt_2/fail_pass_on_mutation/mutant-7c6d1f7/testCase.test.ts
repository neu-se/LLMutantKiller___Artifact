import plural from '../../../../../../../../../../../subject_repositories/plural/index.js';

describe('pluralization of words ending with consonant + o', () => {
  it('should correctly pluralize words ending with consonant + o by adding "es"', () => {
    expect(plural('hero')).toBe('heroes');
    expect(plural('potato')).toBe('potatoes');
    expect(plural('tomato')).toBe('tomatoes');
    expect(plural('echo')).toBe('echoes');
    expect(plural('veto')).toBe('vetoes');
  });
});