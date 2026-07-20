import plural from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe('plural function', () => {
  it('should not match "women" when checking plural of "woman"', () => {
    expect(plural('woman')).toBe('women');
    expect(plural('women')).not.toBe('womens');
  });
});