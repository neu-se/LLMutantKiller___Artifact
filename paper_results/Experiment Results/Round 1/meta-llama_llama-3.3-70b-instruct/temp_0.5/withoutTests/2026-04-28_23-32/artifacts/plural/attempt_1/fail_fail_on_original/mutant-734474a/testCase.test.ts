import { plural } from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe('plural function', () => {
  it('should return the correct plural form for the word "bacterium"', () => {
    expect(plural('bacterium', 2)).toBe('bacteria');
    expect(plural('bacterium', 1)).toBe('bacterium');
  });
});