import { plural, monkeyPatch, unmonkeyPatch } from '../../../../../../../../../../../subject_repositories/plural/index';

describe('plural function', () => {
  it('should return the correct plural form of a word', () => {
    monkeyPatch();
    const word = 'cat';
    const num = 2;
    expect(word.plural(num)).toBe('cats');
    unmonkeyPatch();
  });
});