import { plural } from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe('plural function', () => {
  it('should return the correct plural form for the word "criterion"', () => {
    expect(plural('criterion')).toBe('criteria');
  });
});