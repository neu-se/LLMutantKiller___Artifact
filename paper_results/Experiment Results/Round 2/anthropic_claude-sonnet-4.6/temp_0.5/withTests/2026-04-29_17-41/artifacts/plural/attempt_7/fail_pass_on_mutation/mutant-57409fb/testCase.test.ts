import plural from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe('plural', () => {
  it('should pluralize word when num is not provided', () => {
    // If original is: num !== 1 || num === undefined (always true for undefined since undefined !== 1)
    // If mutated changes the semantics such that undefined causes singular return
    // Test the monkeyPatch path where num might not be passed
    plural.monkeyPatch();
    const result = (String.prototype as any).plural.call('test');
    plural.unmonkeyPatch();
    expect(result).toBe('tests');
  });
});