import { plural } from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe('plural function', () => {
  it('should return the correct plural form for "woman"', () => {
    expect(plural('woman')).toBe('women');
    expect(plural('woman', 2)).toBe('women');
  });
});