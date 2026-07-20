import plural from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe('plural function with -ics ending words', () => {
  it('should handle words ending with "iCs" in mixed case', () => {
    expect(plural('EconomiCs')).toBe('EconomiCs');
    expect(plural('PhysiCs')).toBe('PhysiCs');
    expect(plural('MathiCs')).toBe('MathiCs');
  });
});