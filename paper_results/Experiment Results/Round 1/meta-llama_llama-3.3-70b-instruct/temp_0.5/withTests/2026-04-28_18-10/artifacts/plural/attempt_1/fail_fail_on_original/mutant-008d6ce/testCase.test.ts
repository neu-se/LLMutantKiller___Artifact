import { plural } from '../../../../../../../../../../../subject_repositories/plural/index.js';

describe('plural function', () => {
  it('should return the plural form of a word when the input number is not 1', () => {
    expect(plural('test', 2)).toBe('tests');
  });
});