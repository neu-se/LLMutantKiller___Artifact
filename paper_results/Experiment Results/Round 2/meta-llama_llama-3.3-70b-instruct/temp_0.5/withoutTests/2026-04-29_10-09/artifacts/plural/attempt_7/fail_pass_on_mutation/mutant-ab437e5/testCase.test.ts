import plural from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe('plural', () => {
  it('should correctly pluralize words ending with "y"', () => {
    expect(plural('fly', 2)).toBe('flies');
    expect(plural('city', 2)).toBe('cities');
    expect(plural('baby', 2)).toBe('babies');
    expect(plural('boy', 2)).toBe('boys');
    expect(plural('toy', 2)).toBe('toys');
    expect(plural('play', 2)).toBe('plays');
    expect(plural('ay', 2)).toBe('ays'); 
    expect(plural('ay', 1)).toBe('ay'); // This test case should pass on the original code and fail on the mutated code if the mutation causes incorrect pluralization for singular inputs
  });
});