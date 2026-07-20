import plural from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe('plural function', () => {
  it('should correctly pluralize "potato" to "potatoes"', () => {
    expect(plural('potato')).toBe('potatoes');
  });
});