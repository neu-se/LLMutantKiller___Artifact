import plural from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe('plural', () => {
  it('should correctly pluralize words ending with "y"', () => {
    expect(plural('fly', 2)).toBe('flies');
    expect(plural('city', 2)).toBe('cities');
    expect(plural('baby', 2)).toBe('babies');
    expect(plural('boy', 2)).toBe('boys');
    expect(plural('toy', 2)).toBe('toys');
    expect(plural('play', 2)).toBe('plays');
    expect(plural('fly', 2)).toBe('flies'); // These test cases should pass on the original code
    expect(plural('ayy', 2)).toBe('ayys'); // This test case should fail on the mutated code
  });
});