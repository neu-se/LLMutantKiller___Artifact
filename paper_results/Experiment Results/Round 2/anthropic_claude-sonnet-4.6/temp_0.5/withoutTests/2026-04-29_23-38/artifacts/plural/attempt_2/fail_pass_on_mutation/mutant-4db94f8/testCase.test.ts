import plural from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe('plural', () => {
  it('should return dice for die', () => {
    expect(plural('die')).toBe('dice');
  });
});