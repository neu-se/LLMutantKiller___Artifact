import plural from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe('plural function', () => {
  it('should correctly pluralize "cello" to "cellos"', () => {
    const result = plural('cello');
    expect(result).toBe('cellos');
  });
});