import plural from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe('plural function', () => {
  it('should return the correct plural form for a word that ends with -tropic', () => {
    expect(plural('tropic', 2)).toBe('tropics');
    expect(plural('tropics', 2)).toBe('tropics');
  });
});