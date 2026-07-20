import plural from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe('plural function', () => {
  it('should correctly pluralize words that end with "iao"', () => {
    expect(plural('fiao')).toBe('fiaos');
  });
});