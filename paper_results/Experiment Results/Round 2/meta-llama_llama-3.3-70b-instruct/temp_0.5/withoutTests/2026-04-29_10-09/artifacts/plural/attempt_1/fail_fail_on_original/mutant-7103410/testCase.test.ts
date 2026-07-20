import { plural } from '../../index';

describe('plural function', () => {
  it('should return the correct plural form of a word', () => {
    plural.monkeyPatch();
    const word = 'cat';
    const num = 2;
    expect(word.plural(num)).toBe('cats');
    plural.unmonkeyPatch();
  });
});