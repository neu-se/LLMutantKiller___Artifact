import plural from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe('plural y-rule with quy anchor', () => {
  it('should not apply the quy rule to words that contain quy but do not end with quy', () => {
    expect(plural('quylark')).toBe('quylarks');
  });
});