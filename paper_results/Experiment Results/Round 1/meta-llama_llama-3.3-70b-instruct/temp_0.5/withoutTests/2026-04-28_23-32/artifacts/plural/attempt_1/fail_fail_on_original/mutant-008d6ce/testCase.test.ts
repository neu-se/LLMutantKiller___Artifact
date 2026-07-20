import { plural } from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe('plural function', () => {
  it('should return the plural form of a word when the number is not 1', () => {
    expect(plural('cat', 2)).toBe('cats');
    expect(plural('dog', undefined)).toBe('dogs');
  });
});