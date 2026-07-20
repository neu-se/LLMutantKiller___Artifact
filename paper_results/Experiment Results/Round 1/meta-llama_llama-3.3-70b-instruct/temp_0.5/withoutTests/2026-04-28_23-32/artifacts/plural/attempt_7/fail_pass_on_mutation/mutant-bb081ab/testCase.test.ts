import plural from '../../../../../../../../../../../subject_repositories/plural/index';

describe('plural', () => {
  it('should return the correct plural form for a given word', () => {
    const word = 'cactus';
    const pluralForm = plural(word, 2);
    const singularForm = plural(word, 1);
    expect(pluralForm).not.toBe(singularForm);
  });
});