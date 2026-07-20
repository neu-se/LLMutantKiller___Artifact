import plural from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe('plural function', () => {
  it('should correctly match "woman" with word boundary but not partial matches', () => {
    expect(plural('woman')).toBe('women');
    expect(plural('womanly')).toBe('womanlies');
    expect(plural('oman')).toBe('omans');
  });
});