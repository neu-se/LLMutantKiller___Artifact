import plural from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe('plural string rules', () => {
  it('should apply string-keyed rules added via addRule', () => {
    // In the mutated code, the string rule check is nested inside the RegExp block
    // making it unreachable. Words matched only by string rules fall through to default +s
    expect(plural('criterion')).toBe('criteria');
  });
});