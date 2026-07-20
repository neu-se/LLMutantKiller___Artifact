import plural from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe('plural function behavior with words containing "ao"', () => {
  it('should correctly handle words containing "ao" followed by other letters', () => {
    expect(plural('caiox')).toBe('caioxes');
  });
});