import { plural } from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe('plural function', () => {
  it('should handle rules with string results correctly', () => {
    expect(plural('criterion', 2)).toBe('criteria');
    expect(plural('criterion', 1)).toBe('criterion');
  });
});