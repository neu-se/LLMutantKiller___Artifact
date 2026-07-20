import { plural } from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe('plural', () => {
  it('should correctly pluralize "woman" and "man"', () => {
    expect(plural('woman')).toBe('women');
    expect(plural('man')).toBe('men');
    expect(plural('Woman')).toBe('Womans'); // This test case will fail for the mutated code
  });
});